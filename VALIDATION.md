# Verification — 2 November 2026

Profile update: English UI names verified against Mafia revision `0d6677ff6ebc6aec7aca2630f164a2805f6b6307` in public/profile-ui.js, public/premium.js, public/underworld-ui.js, public/art-market-ui.js, public/shop-ui.js and public/navigation.js. Balance snapshot is unchanged. Profile uses XP, Respect counts, Weapon tier, Supporter / Grand Supporter, game possession categories, crime income, CRIME COOLDOWNS and Certified unique originals. Respect/collection bonuses are derived. A copied combined crime income replaces, rather than compounds, its calculated factor. Six additional tests cover thresholds, migration, duplicate bonus prevention and no-weapon eligibility (20 tests total). Browser verified changing Respect, membership, collection count and copied crime income, derived summaries and persistence after reload, without console errors.

Tutorial update: verified automatic first visit, all seven steps, Back/Next/Finish, saved dismissal after reload, header replay, permanent help and 12 glossary entries, profile shortcut, per-page explanations and field hints. Escape dismisses the modal. At a 390px viewport, the dialog fits without horizontal overflow. Browser console had no errors during these checks.

Theme update: verified light/dark switching, saved theme after reload, dark table colors and browser console. Light supporting copy and labels now use larger sizes and stronger contrast. The theme script runs before styles to avoid a light flash on dark-mode reloads.

- `npm test`: 14 calculation tests passed.
- JavaScript syntax checks passed for the app, guide and calculation modules.
- Local HTTP preview and `/health` returned successfully.
- Browser checks: all eight pages opened; guide search and no-match state; crime search; profile update to Godfather, tier 3 and jet ownership; Overseas estimate (1,503 XP, 47.0 XP/energy); Runner input updates and hourly reinvestment; investment term/rate changes; route profit ($390,000 in default scenario); next-rank planner; four team mission cards.
- Daily checklist survived page reload; profile and calculator settings persisted in this browser.
- Desktop visual review and 390-pixel phone layout/navigation review completed. Phone overview had no horizontal page overflow. Wide data tables intentionally scroll within their panels.
- Browser console reported no errors during the final page checks.
- Preview test state reset to defaults after checks.
- No game files or game database were changed.
- Docker is not installed in the authoring environment. The actual Nginx container, Docker image build, Portainer deployment, proxy network, DNS and certificate issuance have not been run or verified on a VPS.

The deployment package contains a no-build static-mount stack as well as a Dockerfile/image-based alternative. Follow README.md for setup and first deployment checks.
