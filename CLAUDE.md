# AI Voice Bot Project - Claude Code Instructions

## Project Overview

A generative AI voice bot built with Python, Azure Agents, VoiceLive APIs, and React frontend.

## Session Workflow

This project uses a context-preserving development workflow. Use these commands:

| Command | When to Use |
|---------|-------------|
| `/session-start` | Beginning of new session - loads context |
| `/session-save` | Before ending session - saves state |
| `/session-status` | Quick check of current progress |

## Auto-Load Context (Minimal)

At session start, read these files in order:
1. `.agent-os/product/mission-lite.md` (if exists)
2. `.agent-os/context/current-session.md`
3. Active feature's `spec-lite.md` (if feature in progress)

## Project Structure

```
ProtectiveTeleLife/
├── .agent-os/
│   ├── product/           # Product docs (mission, tech-stack, decisions)
│   ├── specs/             # Feature specifications
│   │   └── YYYY-MM-DD-feature-name/
│   │       ├── spec.md
│   │       ├── spec-lite.md
│   │       └── tasks.md
│   └── context/
│       └── current-session.md   # Session state for handoffs
├── .claude/
│   └── skills/
│       └── session-manager/     # Session management commands
├── acs-agent/             # Azure Communication Services agent
├── acs-voice-test/        # Voice testing module
└── AI_VoiceBot_TaskTracker.xlsx  # Team task tracking
```

## Development Guidelines

1. **One task at a time** - Complete and commit before moving on
2. **Frequent commits** - Commit after each meaningful change
3. **Update tasks.md** - Mark checkboxes as work completes
4. **Save sessions** - Run `/session-save` before ending

## Tech Stack

- **Backend:** Python, FastAPI
- **AI/ML:** Azure Agents, Azure OpenAI, Azure Speech Services
- **Voice:** VoiceLive APIs
- **Frontend:** React, TypeScript, TailwindCSS
- **DevOps:** GitHub Actions, Docker

## Key Files for Context

| File | Purpose |
|------|---------|
| `current-session.md` | Where we left off, next steps |
| `tasks.md` | Current feature task list |
| `spec-lite.md` | Current feature summary |
| `mission-lite.md` | Project purpose (when created) |
