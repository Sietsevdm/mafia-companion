# Portainer deployment — like Apex League

The Ledger has its own stack and published image. It shares only Nginx Proxy Manager's existing Docker network with your other apps.

## 1. Create a separate stack

In Portainer, select the same Docker environment as Nginx Proxy Manager. Open **Stacks → Add stack**, name it **mafia-companion**, and select **Web editor**.

Paste the contents of `portainer-stack.yaml` from this repository. It uses the ready-built image `ghcr.io/sietsevdm/mafia-companion:1.0.1`.

The F1 stack uses an external network named `proxy`; this stack defaults to the same network. If your NPM network has a different name, add the environment variable `PROXY_NETWORK` with its exact name.

No app secrets or database variables are needed. No SSH commands or uploaded files are needed.

If the GHCR package is private, select your existing authenticated GHCR registry in Portainer, with access to this package. Alternatively, on GitHub open the **mafia-companion package → Package settings → Change visibility → Public** so it can be pulled anonymously. A public repository does not guarantee a public container package.

Click **Deploy the stack**, then confirm the companion container becomes healthy.

## 2. Add DNS

In Hostinger, add an A record for your chosen subdomain, such as `ledger`, pointing to your VPS public IPv4. Leave existing game and F1 records unchanged.

## 3. Add Nginx Proxy Manager host

Add a Proxy Host with your ledger domain:

| Setting | Value |
| --- | --- |
| Scheme | `http` |
| Forward hostname | `mafia-companion` |
| Forward port | `80` |
| Websockets | Not required |

Request a Let's Encrypt certificate in the SSL tab and enable Force SSL once the domain resolves correctly. Open your HTTPS domain and verify the guide and a calculator load.

## Updates and rollback

Each published release has a versioned image. Set `LEDGER_IMAGE` to the new image tag, update the stack and enable **Re-pull image**. Roll back by selecting the previous image tag and updating again.

Settings are stored in the browser, so no database or server volume backup is required for this app. Keep the same hostname to retain browser-local settings.

## Troubleshooting

- **Unauthorized / denied pulling image:** make the GHCR package public or select a GHCR registry credential permitted to read it.
- **Network proxy not found:** set `PROXY_NETWORK` to the existing NPM custom network name.
- **502 from NPM:** ensure both containers share the proxy network and use hostname `mafia-companion`, port `80`, scheme `http`.
- **Container name already in use:** remove an older companion deployment before starting this one, or give the new service/container a unique name and use that name in NPM.

The release process builds and tests the container on GitHub; it does not automatically change your VPS.
