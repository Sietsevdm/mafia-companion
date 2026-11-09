# Version 1.2.0

- Compare eligible crimes by modelled time to your XP target.
- See best XP per energy, sustained XP/hour, attempts and ammunition budgets.
- Include guidance for daily rewards and eligible team missions.
- Account for energy regeneration during cooldowns and initial energy shortages.

Uses the existing game 1.36.11 balance snapshot. Estimates hold the profile constant and exclude promotion refills, custody and optimized multi-crime rotations.

Validation: all 33 Node tests pass, including four XP route tests. JavaScript syntax and whitespace checks pass. Browser layout has not been verified.

In Portainer use ghcr.io/sietsevdm/mafia-companion:1.2.0 and update the stack with Re-pull image enabled.
