# GYAN VPN

A privacy-first VPN dashboard designed around a real WireGuard control plane.

## Current release
This repository contains the dashboard UI and frontend state model. The Connect control is deliberately a frontend demo state until a WireGuard gateway/API is configured.

## Production architecture
- Next.js dashboard
- Authenticated control API
- WireGuard gateway servers
- Per-device key pairs and peer provisioning
- Encrypted configuration delivery
- Server health and latency checks
- Optional DNS filtering and kill-switch policy

## Important
A browser dashboard cannot itself provide a system-wide VPN tunnel. The tunnel must terminate on a reachable VPN gateway, such as a Linux host running WireGuard. Never commit WireGuard private keys or provider credentials to GitHub.

## Run locally
Use Node.js 22.x:

```bash
npm install
npm run dev
```

Open http://localhost:3000.
