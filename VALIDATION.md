# Verification — 2 November 2026

Content audit: verified field locations and guide/calculator facts against Mafia revision 0d6677ff6ebc6aec7aca2630f164a2805f6b6307. Corrected Dashboard crime income versus My possessions CRIME COOLDOWNS, direct personal weapon-tier location, membership identification, unavailable shop checkout and Warehouses menu name. Reviewed spelling and grammar. Corrected referral-only passive membership factors and individually rounded daily totals; 23 tests pass. Removed the sidebar Source button and its initialization. See CONTENT-AUDIT.md for exact source mappings and remaining model limits.

Dedicated profile page: verified sidebar navigation to #profile, one main heading, live derived summaries while editing, saved values after navigation and reload, and the Crime explorer shortcut returning to the profile page. The header button and tutorial also use the profile route. No overlay remains. Existing profiles use the same storage key.

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

## Recalculation — 8 November 2026 / 1.1.0

- Started from latest companion main 7c2613579a47515ee9471549957a9108df083236; verified unchanged remote head before publication.
- Audited current game 1.36.11 at 74b639548e8f0e851e7ccec8126458dc5ce93058; rechecked remote head before publication.
- All 29 regression tests passed. Differential checker passed 6,748 scenarios and all exported snapshot catalogs against the separate reference checkout.
- Browser verified Runner projection ($720,000 from ten Runners over 72 earning hours), 250-hour payback, flat business prices and three-decimal returns, current profile tier choices, Crown Vault threshold, art direct-sale guide, six-hour investment rate band and rank limit.
- Browser freight example returned $444,678 with one unit and $441,828 with two crates, verifying partial-seizure rounding. Test input restored to one unit.
- Browser console returned no errors. Desktop screenshot saved in the workspace output folder. No new mobile layout verification was performed for this calculation-focused update.
- No game files or player databases were changed. Actual Nginx image checks run in GitHub Actions; no automatic VPS deployment is performed.
