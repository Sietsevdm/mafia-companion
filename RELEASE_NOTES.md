# Version 1.0.2

New players see a seven-step welcome walkthrough covering the profile, income, crimes, XP, team missions, daily rewards and saved settings. Players can dismiss it, replay it from the header Help button, or read every step in the permanent Tutorial & help page. Dismissal is remembered in the browser.

Each calculator now has a How to use this page section. Input hints explain what numbers to enter; clearer labels and a twelve-entry glossary explain expected rewards, net cash, payback, reinvestment, reserve and separate XP systems. Numeric fields associate their hints with the input for assistive technology.

Update the separate Portainer stack image to `ghcr.io/sietsevdm/mafia-companion:1.0.2` and enable Re-pull image. Existing saved profiles, calculator settings, themes and checklists are preserved. The welcome guide appears once on each browser because this is its first release.

No game connection, login, balance or calculator-formula changes are included. The walkthrough explains that all actions and claims still happen in Mafia.

All 14 calculation tests pass. Browser checks cover walkthrough progression, dismissal persistence, replay, profile shortcut, glossary, field hints and mobile dialog layout. GitHub Actions also checks JavaScript syntax and the real Nginx container before publishing AMD64/ARM64 images.
