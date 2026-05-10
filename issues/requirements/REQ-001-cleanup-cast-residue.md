---
id: REQ-001
title: 砍 cast 平台 / 小红书 feed 残留 4 组件
status: in-progress
type: requirement
owner: lead-claude
created: 2026-05-11
parent_scenario: blueprint-2026-05-11
related_blueprint: ~/.claude/repos/skills/blueprint/data/target.md (ui/ 段)
---

## 描述

老板 5-11 重画蓝图后 · ui/ 段定调"砍 cast 平台残" · 4 个 component 不在新蓝图：

- `components/agent-switcher/` — 还在 `@akong/` 旧命名空间 · cast 平台 agent 选择器
- `components/service-card/` — C2A2C 市集页用 · 新蓝图无市集形态
- `components/note-card/` — 小红书风瀑布流卡片 · 新蓝图无 feed 形态
- `components/top-tabs/` — 新蓝图无 top tab 形态 (蓝图标 "候选" · 本轮先砍 · 后续 HR 后台真需要再起新仓)

新蓝图 ui/ 留:
- avatar · button · core · icons · lazy-image · skeleton · tokens
- auth-login (6 provider LoginFlow)
- bottom-nav
- chat/ (5 件套不变)
- (待新加) markdown-renderer

## acceptance

- [ ] 4 个 submodule 全 deinit + .gitmodules 删条目 + 工作树清空
- [ ] 4 个 GitHub repo 全 archive (留 history 不删)
- [ ] components/core/package.json deps 删 4 条
- [ ] components/core/src/index.ts 删对应 export
- [ ] README.md L11 / L41 "19 组件" 改真实数 (剩 15 个: 10 components + 5 chat)
- [ ] README.md L31 / L70 employee-card 残文删 (已不在 .gitmodules)
- [ ] README.md 组件清单跟 .gitmodules 真清单对齐
- [ ] PR 开 + lead self-merge

## 4 问 (完工 paste)

- IMPL: 这次砍的 4 个 submodule + core deps + README 同步
- DONE: ...
- SELF-VERIFY: ...
- GUARDS: 蓝图 anchor data/target.md 已定 "10 components + 5 chat" · 后续起新组件按蓝图加

## 不做

- 不删 GitHub repo (archive only · 留 git history)
- 不动 markdown-renderer 新组件 (另起 REQ)
- 不动 top-tabs 后续 HR 后台真需要的重起 (另起 REQ · 本轮砍不留)
