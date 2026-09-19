'use client';

import { useState } from "react";
import {
  Activity, ArrowDown, ArrowUp, Check, ChevronDown, Globe2,
  LockKeyhole, Power, Shield, Signal, Smartphone, Zap
} from "lucide-react";

const servers = [
  { city: "Mumbai", country: "India", code: "IN", latency: 18, load: 32 },
  { city: "Singapore", country: "Singapore", code: "SG", latency: 42, load: 48 },
  { city: "Frankfurt", country: "Germany", code: "DE", latency: 121, load: 27 },
  { city: "London", country: "United Kingdom", code: "GB", latency: 133, load: 41 },
  { city: "New York", country: "United States", code: "US", latency: 198, load: 56 }
];

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [server, setServer] = useState(servers[0]);
  const [autoConnect, setAutoConnect] = useState(true);
  const [killSwitch, setKillSwitch] = useState(true);
  const [dnsProtection, setDnsProtection] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brandMark"><Shield size={20} /></div>
          <div><strong>GYAN VPN</strong><span>Private • Open Source</span></div>
        </div>
        <div className="topActions">
          <span className="securePill"><LockKeyhole size={14} /> WireGuard</span>
          <button className="iconBtn" aria-label="devices"><Smartphone size={18} /></button>
        </div>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">PRIVACY CONTROL CENTER</p>
          <h1>Fast, simple, <em>free</em> VPN access.</h1>
          <p className="sub">
            A clean control plane for WireGuard servers. Generate configs, monitor health,
            and connect devices without locking the dashboard to a paid plan.
          </p>
        </div>
        <div className={"statusCard " + (connected ? "on" : "")}>
          <div className="statusTop"><span className="dot" /><span>{connected ? "Protected" : "Ready to connect"}</span></div>
          <div className="statusMain">{connected ? "VPN tunnel active" : "Your traffic is not tunneled"}</div>
          <div className="statusMeta"><span>Server: {server.city}</span><span>Ping: {server.latency} ms</span></div>
        </div>
      </section>

      <section className="grid">
        <div className="panel connectPanel">
          <div className="panelHead">
            <div><span className="label">CONNECTION</span><h2>{connected ? "Connected" : "Disconnected"}</h2></div>
            <span className="tinyBadge"><Signal size={13} /> {server.latency} ms</span>
          </div>
          <button className={"connectBtn " + (connected ? "connected" : "")} onClick={() => setConnected(v => !v)}>
            <span className="orb">{connected ? <Check size={26} /> : <Power size={26} />}</span>
            <strong>{connected ? "Disconnect VPN" : "Connect VPN"}</strong>
            <span>{connected ? "Protected by the selected gateway" : "Secure this device now"}</span>
          </button>
          <div className="metrics">
            <div><span>SESSION</span><strong>{connected ? "00:14:38" : "00:00:00"}</strong></div>
            <div><span>DOWNLOAD</span><strong><ArrowDown size={14} /> 38.4 MB</strong></div>
            <div><span>UPLOAD</span><strong><ArrowUp size={14} /> 7.9 MB</strong></div>
          </div>
        </div>

        <div className="panel serverPanel">
          <div className="panelHead">
            <div><span className="label">SERVER</span><h2>Choose location</h2></div><Globe2 size={20} />
          </div>
          <div className="selectBox" onClick={() => setOpen(v => !v)}>
            <div><strong>{server.city}</strong><span>{server.country} • {server.code}</span></div>
            <ChevronDown size={19} />
          </div>
          {open && (
            <div className="serverMenu">
              {servers.map(s => (
                <button key={s.code + s.city} onClick={() => { setServer(s); setOpen(false); }}>
                  <span><b>{s.code}</b>{s.city}</span><small>{s.latency} ms • {s.load}% load</small>
                </button>
              ))}
            </div>
          )}
          <div className="serverInfo">
            <div><span>LATENCY</span><strong>{server.latency} ms</strong></div>
            <div><span>SERVER LOAD</span><strong>{server.load}%</strong></div>
            <div><span>PROTOCOL</span><strong>WireGuard</strong></div>
          </div>
        </div>

        <div className="panel settingsPanel">
          <div className="panelHead">
            <div><span className="label">PROTECTION</span><h2>Safety controls</h2></div><Zap size={20} />
          </div>
          <Toggle title="Kill switch" desc="Block traffic if the tunnel drops" value={killSwitch} setValue={setKillSwitch} />
          <Toggle title="DNS leak protection" desc="Use encrypted VPN DNS" value={dnsProtection} setValue={setDnsProtection} />
          <Toggle title="Auto-connect" desc="Connect on untrusted networks" value={autoConnect} setValue={setAutoConnect} />
        </div>

        <div className="panel controlPanel">
          <div className="panelHead">
            <div><span className="label">DEVICE ACCESS</span><h2>Get connected</h2></div><Activity size={20} />
          </div>
          <div className="deviceRow">
            <div><Smartphone /><div><strong>Mobile & desktop</strong><span>Generate a WireGuard profile for each device.</span></div></div>
            <button>Generate config</button>
          </div>
          <div className="note">
            <LockKeyhole size={15} />
            <span>Private keys must stay server-side and should only be delivered through authenticated config endpoints.</span>
          </div>
        </div>
      </section>

      <footer>
        <span>GYAN VPN • Free control dashboard</span>
        <span>Gateway status: <b className="good">ready for WireGuard</b></span>
      </footer>
    </main>
  );
}

function Toggle({
  title, desc, value, setValue
}: {
  title: string;
  desc: string;
  value: boolean;
  setValue: (v: boolean) => void;
}) {
  return (
    <button className="toggleRow" onClick={() => setValue(!value)}>
      <span><strong>{title}</strong><small>{desc}</small></span>
      <span className={"switch " + (value ? "active" : "")}><span /></span>
    </button>
  );
}