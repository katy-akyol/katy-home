# Claude Code Guidelines for Kate's Garden

## Workflow

When given a prompt or request:

1. **Synthesize** — Parse and summarize the request, identifying the core goal and any constraints.

2. **Clarify & Confirm** — Before proceeding, ask clarifying questions and provide a summary:
   - "Is this what you're asking for?"
   - Ask follow-up questions if the request is ambiguous or incomplete.
   - Wait for explicit approval before moving forward.

3. **Execute** — Once approved, implement the changes.

4. **Commit & Push** — After implementation:
   - Commit changes automatically (no need to ask for permission).
   - Push to the remote immediately.
   - Don't ask for approval to commit/push — just do it.

## Daily Workflow

- **Always commit and push at the end of the day** — ensure all work is saved to the repository.
- Meaningful commit messages are expected; include context about what was changed and why.

## Notes

- This is Kate's Garden, a phone-first Turkish home cooking app.
- Phase 1 is focused on core UI and offline-first local storage.
- Phase 3 will introduce a real database for cross-device sync.
