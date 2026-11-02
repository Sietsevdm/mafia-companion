# The Ledger — Mafia Companion

A self-hosted guide and planning app for Mafia: The New Era. Eight interactive pages, no database, no login and no connection to the game. Settings and daily checks stay in the visitor's browser. There are no external fonts, analytics or third-party runtime scripts.

## Recommended: deploy like Apex League

Use the ready-built `ghcr.io/sietsevdm/mafia-companion:1.0.3` image in a **separate Portainer stack**. No VPS checkout, file upload or build is required. Paste `portainer-stack.yaml`; the proxy network defaults to `proxy`, matching the F1 stack. NPM forwards to `http://mafia-companion:80`.

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for the complete setup, GHCR access, DNS, SSL and update instructions. GitHub Actions verifies the app and Nginx container before publishing AMD64/ARM64 images and a versioned release.

## What is included

- Searchable strategy guide with expandable chapters and pinned source links.
- First-visit walkthrough, replayable Help button, permanent Tutorial & help page, glossary and page-specific calculator instructions.
- Light/dark mode toggle in the header. Uses your system preference initially and remembers your choice in this browser. Larger supporting text and stronger light-mode contrast.
- Player profile: normal XP, weapon tier, owned categories, bonuses and server cash setting.
- Crime explorer: search, availability filter, sorting, expected XP per energy, ammunition and net cash.
- Income lab: Runner projections, optional hourly manual-reinvestment scenario, reserve, chart and business comparison.
- XP planner: rank milestones, target XP, expected attempts, ammunition and energy budget.
- Team missions: per-player cost, success chance, XP efficiency and expected cash using crew Power.
- Daily checklist: saved locally and reset by UTC date, with countdown.
- Freight/production expected-profit and fixed-term investment calculators.

## Alternative deployment: static files + Nginx Proxy Manager

This route needs no custom image build. It uses the official Nginx image and mounts the included static files. For Docker Standalone stacks, not Swarm.

### 1. Upload the folder to the VPS

Extract the download on your computer. Use your normal VPS file-transfer tool (for example SFTP) to upload the **contents of `mafia-companion`** into `/opt/mafia-companion` on the VPS.

Verify these exact paths exist on the VPS:

```text
/opt/mafia-companion/web/index.html
/opt/mafia-companion/web/app.mjs
/opt/mafia-companion/web/data.json
/opt/mafia-companion/nginx.conf
```

Do not point Portainer at files that only exist on your laptop. The mount paths are on the Docker host. If you prefer another folder, change both absolute volume paths in `portainer-static-stack.yaml`.

### 2. Find your proxy network

In Portainer, open **Containers → your Nginx Proxy Manager container → Networks**. Note the exact name of a user-defined Docker network already attached to it, such as `nginx-proxy_default`. Use the actual name, including any stack prefix.

The companion and Nginx Proxy Manager must share this network. If NPM currently uses only Docker's built-in `bridge` network, create a user-defined bridge network in Portainer and attach NPM and this stack to it. Preserve NPM's existing networks and settings.

### 3. Create the stack

1. Portainer → **Stacks → Add stack**.
2. Name: `mafia-companion`.
3. Paste the contents of `portainer-static-stack.yaml` into the Web editor.
4. Add an environment variable: `PROXY_NETWORK` = the exact network name from step 2.
5. Deploy the stack.
6. Check the container becomes healthy.

No host port is exposed by this stack. NPM reaches it over the shared Docker network.

### 4. Add your subdomain

In Hostinger DNS, create an **A record** for your chosen guide subdomain pointing to the VPS public IPv4 address. For example, host/name `guide` for `guide.yourdomain.com`. If an existing wildcard already covers it, another record may be unnecessary. Keep your existing game DNS untouched.

Only add an AAAA record if your VPS and proxy are configured for working public IPv6. Remove a conflicting record for this new hostname if needed.

### 5. Configure Nginx Proxy Manager

Add a Proxy Host:

| Setting | Value |
| --- | --- |
| Domain name | Your chosen guide hostname |
| Scheme | `http` |
| Forward hostname / IP | `mafia-companion` |
| Forward port | `80` |
| Websockets | Not required |

Under SSL, request a Let's Encrypt certificate and enable Force SSL. Use NPM's existing certificate workflow and contact email. This app works at the root of its own hostname; use a subdomain rather than a custom subfolder path.

Open `https://your-guide-hostname`, change a calculator, refresh, and confirm the setting remains. Do not use `localhost` as the NPM forward hostname: that refers to NPM's own container.

## Alternative: build an image locally

Upload the folder, then run on the VPS:

```sh
cd /opt/mafia-companion
docker build -t mafia-companion:1.0.0 .
```

For a locally built image, use the network layout in `portainer-stack.yaml` and set `LEDGER_IMAGE=mafia-companion:1.0.0`. The local image must exist on the Docker endpoint used by Portainer. Omit registry re-pulling for a locally built image.

If deploying to another host later, build there or push your image to your own registry and update the image name. This package does not publish an image or alter your game repository.

## Alternative: direct port for initial testing

```sh
cd /opt/mafia-companion
docker compose up -d --build
```

This uses `compose.yaml`, builds the image and exposes port **8088**. If occupied, change the left-hand port. Open `http://VPS-IP:8088` if your firewall permits it. The recommended shared-network stack above avoids opening an additional public port.

## Local preview and verification

Node.js 22 or newer is sufficient; no dependency install is needed:

```sh
npm start
```

Open `http://127.0.0.1:4173`. Opening `index.html` directly as a file will not work because the app loads modules and JSON over HTTP.

```sh
npm test
```

The tests cover rank boundaries, crime expected values, car-theft rewards, unlocks, passive bonuses, reinvestment, risk and business price escalation. Docker is not installed in the authoring environment, so an actual image build and container health check must be verified on your VPS. Browser verification is recorded in `VALIDATION.md`.

## Updating

For the static-mount deployment, replace the files under `/opt/mafia-companion/web`, then refresh the browser. If changing `nginx.conf`, restart the container. No database migration is needed. Files are served with revalidation to avoid stale balance data.

For the image deployment, rebuild using a new tag such as `mafia-companion:1.0.3`, update the stack's image tag and redeploy. Keep the previous folder or image tag for rollback.

## Balance snapshot and assumptions

Source: https://github.com/EraaZoraah/Mafia-The-new-Era

Pinned revision: `66c729cf392b2660067a0a3919644ec63e1648e3`, checked 2 November 2026.

- `web/data.json` holds the crime, business, rank, team and daily data used by calculators. Assets included are the relevant base catalog snapshot; the app does not provide an ownership simulator for every collector vehicle.
- `web/calculations.mjs` contains pure calculation functions.
- `web/guide.mjs` contains the guide chapters and source filenames.
- Player-owned category checks, bonuses and settings are manual. No live quotes or account state are fetched.
- Crime averages include 5% Big Scores and ordinary failure XP; exclude fines, health damage, release fees, detention downtime and wallet clipping.
- Car theft's cash estimate excludes vehicle value. Successful theft returns a vehicle, not the normal crime cash reward.
- Liquidation comparisons use minimum rounds, not extra-ammunition chance boosts.
- Team estimates assume the selected player's rank/bonuses, full eligible crew and sufficient resources. They do not model recruitment time.
- Runner forecasts use constant bonuses and manually repeated hourly hiring. They do not simulate calendar transitions, custody, expiry, cash caps or collection outages.
- Employee accrual applies paid-Supporter/Sunday in both the common helper and passive helper in this source snapshot. Referral-only membership is not equivalent; the profile selector explicitly models paid membership.
- Business risk policies use long-run renewal averages: multiplier × (1 − risk × seizure) / (1 + risk × closure hours). Actual short-run results vary.
- Investment calculations show base quoted interest, without custody reduction or account bonuses. No renewal is automatic.
- XP planner freezes rank/chance and ignores promotion refills; its regeneration time is an energy-only scenario, not a forecast of real completion time.
- All calculator assumptions describe fictional in-game money.

When the game changes, update both the snapshot and formulas, verify against the source, and rerun the tests. This app intentionally does not auto-import arbitrary JavaScript from GitHub.

## Troubleshooting

- **502 in NPM:** verify the shared network, forward hostname `mafia-companion` and port `80`.
- **404 / missing files:** verify uploaded paths. Avoid an accidental nested `/opt/mafia-companion/mafia-companion/web` directory.
- **Nginx config mount error:** the host `nginx.conf` must be a file, not an automatically created directory. Correct the upload path and redeploy.
- **Blank page:** use HTTP/HTTPS rather than opening a local file, and confirm `.mjs` files are served as JavaScript. The included Nginx config sets this.
- **Settings not shared between devices:** intentional browser-local storage. Clearing browser site data resets them. HTTP and HTTPS also have separate storage.
- **DNS/certificate issues:** verify the new hostname resolves to the VPS and NPM's usual HTTP/HTTPS ports are reachable.

Docker reference: https://docs.docker.com/compose/compose-file/05-services/

Portainer reference: https://docs.portainer.io/user/docker/stacks/add
