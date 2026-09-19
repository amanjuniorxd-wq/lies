import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "gyan-vpn-control",
    gateway: "new-york",
    gatewayReady: false,
    reason: "A privileged WireGuard gateway with public UDP access is required."
  });
}
