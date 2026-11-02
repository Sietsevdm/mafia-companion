# Verification — 2 November 2026

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
