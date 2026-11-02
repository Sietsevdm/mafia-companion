# Version 1.0.5

Audited the guide, tutorial, profile instructions, English names and calculator assumptions against Mafia revision 0d6677ff6ebc6aec7aca2630f164a2805f6b6307. Corrected spelling, grammar and unclear explanations. See CONTENT-AUDIT.md for the complete mapping and scope.

Key corrections:

- crime income is on Dashboard → Your standing, not My possessions.
- CRIME COOLDOWNS is in My empire → My possessions.
- WEAPON TIER has a direct readout in My empire → Weapons & ammunition → Personal armory.
- Active Supporter / Grand Supporter identification uses the diamond title beside the player name. Membership product cards can both appear active and do not reliably identify the tier.
- Premium shop currently says checkout is unavailable; the guide no longer implies immediate purchases are possible.
- Recovered vehicles are handled through My empire → Warehouses.
- Referral-only membership receives its general reward bonus but not the extra paid-membership passive factor. A new profile checkbox models that distinction. Simultaneously active memberships with different tiers remain an approximation.
- Daily overview totals now sum the individually rounded rewards.

Removed the sidebar Source button as requested. Per-topic verification references remain separate from that button.

Existing profile settings, theme and checklist are preserved. The numeric crime, rank and business catalog values matched the audited source; snapshot references now point to that revision.

All 23 tests pass, including referral/Sunday/marriage calculations and a regression check for correct field locations. Browser checks cover corrected copy, persisted referral settings, income multiplier, source-button removal and console errors. GitHub Actions verifies the Nginx container before publishing AMD64/ARM64 images.

In Portainer, set the image to `ghcr.io/sietsevdm/mafia-companion:1.0.5` and update the stack with Re-pull image enabled. No VPS changes are made automatically.
