#!/usr/bin/env bash
set -euo pipefail
apt-get update
apt-get install -y wireguard iptables qrencode curl
install -d -m 700 /etc/wireguard
umask 077
if [ ! -f /etc/wireguard/server.key ]; then wg genkey | tee /etc/wireguard/server.key | wg pubkey > /etc/wireguard/server.pub; fi
PUB_IP="$(curl -4fsS https://api.ipify.org)"
IFACE="$(ip route show default | awk '/default/ {print $5; exit}')"
cat >/etc/wireguard/wg0.conf <<EOF
[Interface]
Address = 10.66.66.1/24
ListenPort = 51820
PrivateKey = $(cat /etc/wireguard/server.key)
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -A FORWARD -o wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o $IFACE -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -D FORWARD -o wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o $IFACE -j MASQUERADE
EOF
echo 'net.ipv4.ip_forward=1' >/etc/sysctl.d/99-gyan-vpn.conf
sysctl --system
systemctl enable --now wg-quick@wg0
ufw allow 51820/udp 2>/dev/null || true
echo "GYAN VPN gateway installed."
echo "Public endpoint: $PUB_IP:51820"
echo "Server public key: $(cat /etc/wireguard/server.pub)"
