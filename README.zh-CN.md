# Wang-Lin-Chang

**给 DeepSeek Harness 的开源套件——十五个仓库，八个 npm 包。每个能力声明都带实验编号与对照组。**

> 一个 40 分钟的 agent 任务跑到第 39 分钟，会话崩了——输出没了、状态没了、连"它到底做完没有"都无从知晓。我们在 DeepSeek Harness 上真实踩过这个坑，然后写了这套件来回答它。全部 Apache-2.0，全部三平台 CI 全绿。

English: [README.md](./README.md)。

[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![ci](https://github.com/Wang-Lin-Chang/Wang-Lin-Chang/actions/workflows/ci.yml/badge.svg)](https://github.com/Wang-Lin-Chang/Wang-Lin-Chang/actions/workflows/ci.yml)

| 插件 | 干什么 | 证据 |
|---|---|---|
| [dsh-witness](https://github.com/Wang-Lin-Chang/dsh-witness) | 崩溃存活任务：文件系统即真相源、跨重启收养、尸检报告 | 12 场景 / 34 断言 |
| [dsh-anchor](https://github.com/Wang-Lin-Chang/dsh-anchor) | 会话锚点协议：预承诺意图、动作后对账 | 37 断言 |
| [dsh-cross-platform](https://github.com/Wang-Lin-Chang/dsh-cross-platform) | Linux 沙箱后端（chattr + bubblewrap）| 34/34 ×3 |
| [dsh-macos](https://github.com/Wang-Lin-Chang/dsh-macos) | macOS 沙箱后端（uchg + sandbox-exec）| 34/34 ×3 |
| [schedule-core](https://github.com/Wang-Lin-Chang/schedule-core) | 零依赖持久调度核心 | 单元 37 + fuzz 200/0 + 差分 644/0 |
| [dsh-schedule](https://github.com/Wang-Lin-Chang/dsh-schedule) | 跨重启提醒与定时任务 | 三平台 CI |
| [agent-runner-mcp](https://github.com/Wang-Lin-Chang/agent-runner-mcp) | 沙箱执行服务的 MCP server——Claude Code 已验证连接 | 15/15 协议测试 + 三平台 CI |
| [dsh-story](https://github.com/Wang-Lin-Chang/dsh-story) | 长篇网文助手：故事账本 + 14 类叙事不变量（零误杀）| 9/9 + 真实文本实测 + 三平台 CI |
| [dsh-mesh](https://github.com/Wang-Lin-Chang/dsh-mesh) | 多 Agent 崩溃隔离网：文件即消息 | 3 实验 + 9 断言 |
| [dsh-megamesh](https://github.com/Wang-Lin-Chang/dsh-megamesh) | 超级多 Agent 架构体系：一脑千军、任期联邦、不变量、时间线、人机共读战报 | 39 实验（E01–E39）+ 127 测试 + 三平台 CI |

**npm install / 直接下载安装**

```bash
npm i dsh-megamesh dsh-mesh dsh-schedule dsh-witness agent-runner-mcp dsh-anchor
npm i @wang--lin--chang/schedule-core @wang--lin--chang/dsh-story
```

> 八个包已全部上线 npm registry（dsh-cross-platform/dsh-macos 是平台后端库、asmfs-spec/autopsy-spec 是协议文档——以仓库为准）。

**框架无关协议 / Framework-agnostic specs**

| 规范 | 定义什么 |
|---|---|
| [asmfs-spec](https://github.com/Wang-Lin-Chang/asmfs-spec) | Agent State Machine as File System——目录结构就是状态机 |
| [autopsy-spec](https://github.com/Wang-Lin-Chang/autopsy-spec) | Agent Autopsy Format——结构化尸检报告 + 死因代码分类学 D-01~D-09 |

**三个不同 / Three things we do differently**

1. 每个能力声明带实验编号与对照组——口号不进门，数据进门。
2. 我们把"时间"当敌人来测——回拨/前跳/DST/崩溃窗口的时钟乱序 fuzz + 实装×模型差分（200 种子 / 7770 随机操作 + 644 断言）。
3. 我们把投递语义写进文档——README 里写明投递模式。

**审计欢迎 / Audit welcome.** 每个声称背后的实验数据都在各仓库的 EXPERIMENTS.md 里。

## 诚实边界 / Honest boundaries

- 本页是套件索引，不是证据本身：每个能力声明的装置编号、对照组与边界，以对应仓库的 EXPERIMENTS.md 与 README「诚实边界」一节为准。
- 单机共享文件系统、at-least-once 派发、崩溃容错 ≠ 拜占庭容错等边界，在各仓库逐条写明，不在本页重复。
