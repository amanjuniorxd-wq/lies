import { NextResponse } from "next/server";

const servers = [
  { id: "new-york", name: "New York", country: "US", protocol: "WireGuard", status: "gateway-required" },
  { id: "mumbai", name: "Mumbai", country: "IN", protocol: "WireGuard", status: "gateway-required" },
  { id: "singapore", name: "Singapore", country: "SG", protocol: "WireGuard", status: "gateway-required" }
];

export async function GET() {
  return NextResponse.json({ servers });
}
