#!/usr/bin/env bash
set -euo pipefail
NAME="${1:-macbook}"
SERVER_PUBLIC_KEY="$(cat /etc/wireguard/server.pub)"
SERVER_ENDPOINT="${SERVER_ENDPOINT:?Set SERVER_ENDPOINT to the VPS public IPv4}"
CLIENT_IP="${CLIENT_IP:-10.66.66.2}"
umask 077
CLIENT_DIR="/etc/wireguard/clients/$NAME"
mkdir -p "$CLIENT_DIR"
wg genkey | tee "$CLIENT_DIR/private.key" | wg pubkey > "$CLIENT_DIR/public.key"
cat >"$CLIENT_DIR/$NAME.conf" <<EOF
[Interface]
PrivateKey = $(cat "$CLIENT_DIR/private.key")
Address = $CLIENT_IP/32
DNS = 1.1.1.1

[Peer]
PublicKey = $SERVER_PUBLIC_KEY
Endpoint = $SERVER_ENDPOINT:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
EOF
wg set wg0 peer "$(cat "$CLIENT_DIR/public.key")" allowed-ips "$CLIENT_IP/32"
wg-quick save wg0
qrencode -t ansiutf8 <"$CLIENT_DIR/$NAME.conf" || true
echo "Client config: $CLIENT_DIR/$NAME.conf"
