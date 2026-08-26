# Wang-Lin-Chang

**Open-source suite for DeepSeek Harness — thirteen repos, eight npm packages. Every capability claim carries an experiment number and a control group.**

> A 40-minute agent task crashes at minute 39 — output lost, state lost, no way to tell whether it ever finished. We hit that on DeepSeek Harness, and we built this suite to answer it. All Apache-2.0, all three-platform CI green.

中文版见 [README.zh-CN.md](./README.zh-CN.md)。

[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![ci](https://github.com/Wang-Lin-Chang/Wang-Lin-Chang/actions/workflows/ci.yml/badge.svg)](https://github.com/Wang-Lin-Chang/Wang-Lin-Chang/actions/workflows/ci.yml)

| Plugin | What it does | Evidence |
|---|---|---|
| [dsh-witness](https://github.com/Wang-Lin-Chang/dsh-witness) | Crash-surviving jobs: filesystem as source of truth, cross-restart adoption, autopsy reports | 12 scenarios / 34 assertions |
| [dsh-anchor](https://github.com/Wang-Lin-Chang/dsh-anchor) | Session anchor protocol: pre-committed intents, post-action reconciliation | 37 assertions |
| [dsh-cross-platform](https://github.com/Wang-Lin-Chang/dsh-cross-platform) | Linux sandbox backend (chattr + bubblewrap) | 34/34 ×3 |
| [dsh-macos](https://github.com/Wang-Lin-Chang/dsh-macos) | macOS sandbox backend (uchg + sandbox-exec) | 34/34 ×3 |
| [schedule-core](https://github.com/Wang-Lin-Chang/schedule-core) | Zero-dependency persistent scheduler core | unit 37 + fuzz 200/0 + diff 644/0 |
| [dsh-schedule](https://github.com/Wang-Lin-Chang/dsh-schedule) | Cross-restart reminders + scheduled jobs | 3-platform CI |
| [agent-runner-mcp](https://github.com/Wang-Lin-Chang/agent-runner-mcp) | MCP server for the sandboxed runner protocol — Claude Code verified connected | 15/15 protocol test + 3-platform CI |
| [dsh-story](https://github.com/Wang-Lin-Chang/dsh-story) | Long-form novel assistant: story ledger + 14 narrative invariants (zero mis-kills) | 9/9 + real-text tested + 3-platform CI |
| [dsh-mesh](https://github.com/Wang-Lin-Chang/dsh-mesh) | Multi-Agent Mesh: crash-isolated coordination, files are the messages | 3 experiments + 9 assertions |
| [dsh-megamesh](https://github.com/Wang-Lin-Chang/dsh-megamesh) | Super multi-agent architecture: one-brain-thousand-troops, term-lease federation, invariants, timelines, human-machine readable reports | 39 experiments (E01–E39) + 127 tests + 3-platform CI |

**npm install**

```bash
npm i dsh-megamesh dsh-mesh dsh-schedule dsh-witness agent-runner-mcp dsh-anchor
npm i @wang--lin--chang/schedule-core @wang--lin--chang/dsh-story
```

> All eight packages are live on the npm registry (dsh-cross-platform/dsh-macos are platform backend libraries, asmfs-spec/autopsy-spec are protocol docs — the repos are authoritative).

**Framework-agnostic specs**

| Spec | What it defines |
|---|---|
| [asmfs-spec](https://github.com/Wang-Lin-Chang/asmfs-spec) | Agent State Machine as File System — the directory structure is the state machine |
| [autopsy-spec](https://github.com/Wang-Lin-Chang/autopsy-spec) | Agent Autopsy Format — structured death reports + death-code taxonomy D-01~D-09 |

**Three things we do differently**

1. Every capability claim carries an experiment number and a control group — no slogan enters a README, data does.
2. We fuzz the wall clock — rollback, jump-forward, DST gaps, crash windows (200 seeds / 7770 random ops) plus an implementation×model differential test (644 assertions).
3. We document delivery semantics precisely — the README states the delivery mode in full.

**Audit welcome.** The experiments behind every claim are in each repo's EXPERIMENTS.md.

## Honest boundaries

- This page is the suite index, not the evidence itself: the device numbers, control groups, and boundaries behind every capability claim live in the corresponding repo's EXPERIMENTS.md and README "Honest boundaries" section.
- Single-machine shared filesystem, at-least-once dispatch, crash tolerance ≠ Byzantine tolerance, and the other boundaries are stated per repo and are not repeated here.
