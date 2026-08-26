#!/usr/bin/env node
// align-audit.mjs — suite alignment auditor (zero dependencies, node >= 22).
// Checks every repo against the suite baseline (dsh-vap):
//   license / bilingual README pair / badges / ci.yml / experiment ledger / honest boundaries / banned words.
// Usage: node align-audit.mjs <repo-dir> [<repo-dir> ...]
// Exit code: 0 = all green, 1 = failures found.

import * as fs from 'node:fs'
import * as path from 'node:path'
import { spawnSync } from 'node:child_process'

const W = (...cps) => String.fromCharCode(...cps)
const BANNED = [
  W(0x7089), W(0x70E7), W(0x8001, 0x54E5), W(0x684C, 0x9762), W(0x5411, 0x4E0A),
  W(0x56DE, 0x7089), W(0x7194, 0x7089), W(0x953B, 0x9020), W(0x8D85, 0x6B66),
  W(0x6253, 0x5047, 0x8F6E), W(0x7A81, 0x7834), W(0x9996, 0x521B), W(0x6700, 0x4F18),
  W(0x9886, 0x5148), W(0x4E16, 0x754C), W(0x98A0, 0x8986), W(0x9769, 0x547D),
  W(0x91CC, 0x7A0B, 0x7891), W(0x6700, 0x5F3A), W(0x5B8C, 0x7F8E), W(0x72EC, 0x5BB6),
  W(0x65E0, 0x4E0E, 0x4F26, 0x6BD4), W(0x9876, 0x5C16), W(0x9876, 0x7EA7),
  W(0x7EC8, 0x6781), W(0x6587, 0x660E), W(0x51FA, 0x7248, 0x7EA7, 0x522B),
  W(0x66F4, 0x7EDD, 0x7684, 0x662F), W(0x6587, 0x5B57, 0x5BA1, 0x67E5),
  W(0x4ED6, 0x5728, 0x505A),
]
// case-insensitive banned pattern, built from code points so the literal never appears in source
const BANNED_CI = [new RegExp(String.fromCharCode(0x72, 0x61, 0x6c, 0x70, 0x68), 'i')]
// Word-list files (lab/bad-words.json) are the enforcers themselves and are exempt.
const EXEMPT = ['lab/bad-words.json', 'align-audit.mjs']
// Index/list repos have no experiment ledger of their own.
const NO_LEDGER = ['Wang-Lin-Chang', 'awesome-deepseek-harness']

function trackedFiles(root) {
  const r = spawnSync('git', ['-C', root, 'ls-files', '-z'], { encoding: 'utf8' })
  if (r.status === 0 && r.stdout) {
    return r.stdout.split('\0').filter(Boolean).map((p) => path.join(root, p))
  }
  return walk(root)
}

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules' || e.name === '_edge-vap') continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

function checkRepo(root) {
  const name = path.basename(root)
  const fails = []
  const ok = []
  const has = (p) => fs.existsSync(path.join(root, p))
  const read = (p) => (has(p) ? fs.readFileSync(path.join(root, p), 'utf8') : '')

  if (!has('LICENSE')) fails.push('missing LICENSE')
  else ok.push('LICENSE')

  const readme = read('README.md')
  const readmeZh = read('README.zh-CN.md')
  if (!has('README.md')) fails.push('missing README.md')
  else if (!has('README.zh-CN.md')) fails.push('missing README.zh-CN.md')
  else {
    ok.push('bilingual README pair')
    if (!readme.includes('README.zh-CN.md') || !readmeZh.includes('README.md')) fails.push('missing cross-language pointer')
  }

  if (!readme.includes('shields.io') && !readme.includes('awesome.re/badge')) fails.push('no badge in README.md')
  else ok.push('badges')

  if (!has('.github/workflows/ci.yml')) fails.push('missing ci.yml')
  else ok.push('ci.yml')

  const isSpec = name.endsWith('-spec') || name === 'asmfs-spec' || name === 'autopsy-spec'
  if (isSpec) {
    if (has('formal/bmc-checker.mjs')) ok.push('formal checker')
    else if (name === 'autopsy-spec') ok.push('spec (doc form)')
    else fails.push('spec repo missing formal checker')
  } else if (NO_LEDGER.includes(name)) ok.push('index repo (no ledger required)')
  else if (has('EXPERIMENTS.md') || has('CHANGELOG.md')) ok.push('experiment ledger')
  else fails.push('missing EXPERIMENTS.md/CHANGELOG.md')

  const boundaryEn = /honest boundar/i.test(readme)
  const boundaryZh = readmeZh.includes('诚实边界')
  if (boundaryEn || boundaryZh) ok.push('honest boundaries section')
  else fails.push('missing honest-boundaries section')

  // banned words across tracked files
  const files = trackedFiles(root).filter((p) => !EXEMPT.some((x) => p.replace(/\\/g, '/').endsWith(x)))
  for (const p of files) {
    let text
    try { text = fs.readFileSync(p, 'utf8') } catch { continue }
    for (const w of BANNED) {
      if (text.includes(w)) { fails.push(`banned word at ${path.relative(root, p)}`); break }
    }
    for (const re of BANNED_CI) {
      if (re.test(text) && !/bad-words\.json|align-audit\.mjs/.test(p)) { fails.push(`banned(ci) at ${path.relative(root, p)}`); break }
    }
  }

  const status = fails.length === 0 ? 'GREEN' : 'RED'
  console.log(`${status} ${name}: ${ok.length} ok, ${fails.length} fail`)
  for (const f of fails) console.log(`    - ${f}`)
  return { name, status, fails }
}

const roots = process.argv.slice(2)
if (roots.length === 0) { console.error('usage: node align-audit.mjs <repo-dir> [...]'); process.exit(2) }
let red = 0
for (const r of roots) { const res = checkRepo(r); if (res.status === 'RED') red++ }
console.log(`\n${red === 0 ? 'ALL_GREEN' : red + ' RED'} of ${roots.length} repos`)
process.exit(red === 0 ? 0 : 1)
