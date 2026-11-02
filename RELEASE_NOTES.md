# Version 1.0.1

The Ledger can now be deployed like Apex League: a versioned GHCR image, built for AMD64 and ARM64, with a separate Portainer stack on the existing proxy network.

Use `portainer-stack.yaml`. Default image: `ghcr.io/sietsevdm/mafia-companion:1.0.1`. Default network: `proxy`. Optional Portainer variables: `LEDGER_IMAGE` and `PROXY_NETWORK`.

Nginx Proxy Manager target: `http://mafia-companion:80`. No host port, database, VPS clone, bind mount or local image build is required for this deployment.

Includes the complete guide, calculators, local player profile and daily checklist, dark mode and improved light-mode text readability.

GitHub Actions runs calculation tests, JavaScript checks and a real Nginx container smoke test before publishing. Existing static-mount and local-build files remain available as alternatives.
