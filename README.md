# Wang-Lin-Chang

**Six open-source plugins for DeepSeek Harness. Every capability claim carries an experiment number and a control group.**

> A 40-minute agent task crashes at minute 39 — output lost, state lost, no way to tell whether it ever finished. We hit that on DeepSeek Harness, and we built six plugins to answer it. All Apache-2.0, all three-platform CI green.

**给 DeepSeek Harness 的六个开源插件。每个能力声明都带实验编号与对照组。**

> 一个 40 分钟的 agent 任务跑到第 39 分钟，会话崩了——输出没了、状态没了、连"它到底做完没有"都无从知晓。我们在 DeepSeek Harness 上真实踩过这个坑，然后写了六个插件来回答它。全部 Apache-2.0，全部三平台 CI 全绿。

| Plugin | What it does / 干什么 | Evidence / 证据 |
|---|---|---|
| [dsh-witness](https://github.com/Wang-Lin-Chang/dsh-witness) | Crash-surviving jobs: filesystem as source of truth, cross-restart adoption, autopsy reports 崩溃存活任务 | 12 scenarios / 34 assertions |
| [dsh-anchor](https://github.com/Wang-Lin-Chang/dsh-anchor) | Session anchor protocol: pre-committed intents, post-action reconciliation 会话锚点协议 | 37 assertions |
| [dsh-cross-platform](https://github.com/Wang-Lin-Chang/dsh-cross-platform) | Linux sandbox backend (chattr + bubblewrap) Linux 沙箱后端 | 34/34 ×3 |
| [dsh-macos](https://github.com/Wang-Lin-Chang/dsh-macos) | macOS sandbox backend (uchg + sandbox-exec) macOS 沙箱后端 | 34/34 ×3 |
| [schedule-core](https://github.com/Wang-Lin-Chang/schedule-core) | Zero-dependency persistent scheduler core 零依赖持久调度核心 | unit 37 + fuzz 200/0 + diff 644/0 |
| [dsh-schedule](https://github.com/Wang-Lin-Chang/dsh-schedule) | Cross-restart reminders + scheduled jobs 跨重启提醒与定时任务 | 3-platform CI |
| [agent-runner-mcp](https://github.com/Wang-Lin-Chang/agent-runner-mcp) | MCP server for the sandboxed runner protocol — Claude Code verified connected MCP 沙箱执行服务 | 15/15 protocol test + 3-platform CI |
| [dsh-story](https://github.com/Wang-Lin-Chang/dsh-story) | Long-form novel assistant: story ledger + 14 narrative invariants (zero mis-kills) 长篇网文助手 | 9/9 + real-text tested + 3-platform CI |

**Framework-agnostic specs / 框架无关协议**

| Spec | What it defines / 定义什么 |
|---|---|
| [asmfs-spec](https://github.com/Wang-Lin-Chang/asmfs-spec) | Agent State Machine as File System — the directory structure is the state machine 目录即状态机 |
| [autopsy-spec](https://github.com/Wang-Lin-Chang/autopsy-spec) | Agent Autopsy Format — structured death reports + death-code taxonomy D-01~D-09 结构化尸检报告与死因分类学 |

**Three things we do differently / 三个不同**

1. Every capability claim carries an experiment number and a control group — no slogan enters a README, data does. 每个能力声明带实验编号与对照组——口号不进门，数据进门。
2. We fuzz the wall clock — rollback, jump-forward, DST gaps, crash windows (200 seeds / 7770 random ops) plus an implementation×model differential test (644 assertions). 我们把"时间"当敌人来测——回拨/前跳/DST/崩溃窗口的时钟乱序 fuzz + 实装×模型差分。
3. We publish our honest boundaries — at-least-once is not exactly-once, and it says so in the README. 我们公开自己的诚实边界——at-least-once 不是 exactly-once，写进 README。

**审计欢迎 / Audit welcome.** The experiments behind every claim are in each repo's EXPERIMENTS.md. 每个声称背后的实验数据都在各仓库的 EXPERIMENTS.md 里。
