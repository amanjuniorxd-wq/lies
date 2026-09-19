import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GYAN VPN",
  description: "Free, privacy-first WireGuard VPN control dashboard"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}