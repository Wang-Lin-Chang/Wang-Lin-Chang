// Wang-Lin-Chang/.scripts/check-links.mjs — suite index self-check (CI entry, zero deps, node >= 22 for fetch)
import * as fs from 'node:fs'

fs.accessSync('LICENSE')
fs.accessSync('README.md')
fs.accessSync('README.zh-CN.md')

const readme = fs.readFileSync('README.md', 'utf8')
const links = [...new Set([...readme.matchAll(/https:\/\/github\.com\/Wang-Lin-Chang\/[A-Za-z0-9._-]+/g)].map((m) => m[0]))]
let bad = 0
for (const u of links) {
  const r = await fetch(u, { redirect: 'follow' })
  console.log(r.status + ' ' + u)
  if (r.status !== 200) bad++
}
if (bad) { console.error(bad + ' broken link(s)'); process.exit(1) }
console.log('all ' + links.length + ' links ok')
