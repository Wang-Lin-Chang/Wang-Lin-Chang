// Wang-Lin-Chang/.scripts/run-audit-ci.mjs — clone all public suite repos and run align-audit against them (CI entry)
import { execSync } from 'node:child_process'
import * as fs from 'node:fs'

// Public content repos of the suite. dsh-arena (private) is audited locally, not in CI.
const repos = 'asmfs-spec autopsy-spec awesome-deepseek-harness dsh-anchor dsh-cross-platform dsh-macos dsh-megamesh dsh-mesh dsh-schedule dsh-story dsh-vap dsh-witness schedule-core agent-runner-mcp'.split(' ')

fs.mkdirSync('audit-tree', { recursive: true })
for (const r of repos) {
  execSync('git clone --quiet --depth 1 https://github.com/Wang-Lin-Chang/' + r + '.git audit-tree/' + r, { stdio: 'inherit' })
}
execSync('node align-audit.mjs ' + repos.map((r) => 'audit-tree/' + r).join(' '), { stdio: 'inherit' })
