# Version 1.0.4

Player profile is now a dedicated page at #profile, with its own main-menu entry. The header shortcut, tutorial and calculator buttons open that page. Changes save automatically and existing browser settings are preserved.

Player profile now uses the same English names as Mafia: XP (EXPERIENCE in My profile), Respect, Weapon tier, Supporter / Grand Supporter, My possessions categories, crime income, CRIME COOLDOWNS and Certified unique originals. Every setting explains where to find it in the game.

Enter received Respect and certified-original counts; their bonuses are calculated automatically. Optional My possessions values and the owner-only server setting are tucked into separate expandable sections. No personal weapons (Tier 0) is now available and correctly locks weapon-required crimes.

The optional crime income field accepts the combined percentage from My possessions. It replaces the calculated combined crime cash factor, preventing duplicate application of rank, respect, art, marriage and membership. Business and XP calculations retain their own settings.

Existing profiles are preserved. Old respect/art bonus percentages migrate to matching minimum counts; replace those with your exact game counts. Earlier ownership-bonus settings remain in effect unless you enable the exact copied crime income value.

Update your Portainer image to `ghcr.io/sietsevdm/mafia-companion:1.0.4` with Re-pull image enabled. No database migration or game connection is needed.

Twenty tests cover calculator behavior, profile migration, count thresholds, copied-income handling and weapon-tier eligibility. UI naming was checked against Mafia revision 0d6677ff6ebc6aec7aca2630f164a2805f6b6307; the existing balance snapshot is unchanged.
