import { io, type Socket } from "socket.io-client";
import { clientEnv } from "@/config/env";
import type { RealtimeServerToClientEvents } from "@/shared/types/realtime";

export type RealtimeClient = Socket<RealtimeServerToClientEvents>;

export function createRealtimeClient() {
  if (!clientEnv.NEXT_PUBLIC_REALTIME_URL) {
    return null;
  }

  return io(clientEnv.NEXT_PUBLIC_REALTIME_URL, {
    autoConnect: false,
    transports: ["websocket"],
  });
}
