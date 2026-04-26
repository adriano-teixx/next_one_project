"use client";

import { Activity, Wifi, WifiOff } from "lucide-react";
import { useMemo } from "react";
import { useRealtime } from "@/lib/realtime/realtime-provider";

export function RealtimeHealth() {
  const { connected, lastHeartbeatAt, transport } = useRealtime();

  const formattedHeartbeat = useMemo(() => {
    if (!lastHeartbeatAt) {
      return "Aguardando evento";
    }

    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(lastHeartbeatAt);
  }, [lastHeartbeatAt]);

  return (
    <div className="grid gap-3 border-y border-[var(--border)] py-5 sm:grid-cols-3">
      <div>
        <p className="text-sm text-[var(--muted)]">Status</p>
        <p className="mt-1 flex items-center gap-2 text-base font-medium">
          {connected ? <Wifi size={18} /> : <WifiOff size={18} />}
          {connected ? "Conectado" : "Sem servidor realtime"}
        </p>
      </div>
      <div>
        <p className="text-sm text-[var(--muted)]">Transporte</p>
        <p className="mt-1 text-base font-medium">{transport}</p>
      </div>
      <div>
        <p className="text-sm text-[var(--muted)]">Ultimo evento</p>
        <p className="mt-1 flex items-center gap-2 text-base font-medium">
          <Activity size={18} />
          {formattedHeartbeat}
        </p>
      </div>
    </div>
  );
}
