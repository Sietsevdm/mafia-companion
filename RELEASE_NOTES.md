# Version 1.2.1

- Stop rebuilding forms while typing. Numeric changes recalculate after leaving the field or pressing Enter.
- Preserve the next focused field during calculation updates.
- Accept pasted comma-grouped numbers (1,234,567), decimal commas (12,5), and English/Dutch grouped decimals.
- Keep empty and malformed drafts from being saved as zero.

Regression tests cover pasted numbers and input/commit behavior. Uses the existing game balance snapshot.

In Portainer use ghcr.io/sietsevdm/mafia-companion:1.2.1 and update with Re-pull image enabled.
