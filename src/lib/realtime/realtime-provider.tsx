"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createRealtimeClient, type RealtimeClient } from "./realtime-client";

type RealtimeContextValue = {
  client: RealtimeClient | null;
  connected: boolean;
  lastHeartbeatAt: Date | null;
  transport: "websocket" | "disabled";
};

const RealtimeContext = createContext<RealtimeContextValue | null>(null);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => createRealtimeClient());
  const [connected, setConnected] = useState(false);
  const [lastHeartbeatAt, setLastHeartbeatAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!client) {
      return;
    }

    function handleConnect() {
      setConnected(true);
      setLastHeartbeatAt(new Date());
    }

    function handleDisconnect() {
      setConnected(false);
    }

    function handleHeartbeat(payload?: { at?: string }) {
      setLastHeartbeatAt(payload?.at ? new Date(payload.at) : new Date());
    }

    client.on("connect", handleConnect);
    client.on("disconnect", handleDisconnect);
    client.on("heartbeat", handleHeartbeat);
    client.connect();

    return () => {
      client.off("connect", handleConnect);
      client.off("disconnect", handleDisconnect);
      client.off("heartbeat", handleHeartbeat);
      client.disconnect();
    };
  }, [client]);

  const value = useMemo<RealtimeContextValue>(
    () => ({
      client,
      connected,
      lastHeartbeatAt,
      transport: client ? "websocket" : "disabled",
    }),
    [client, connected, lastHeartbeatAt]
  );

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);

  if (!context) {
    throw new Error("useRealtime must be used inside RealtimeProvider.");
  }

  return context;
}
