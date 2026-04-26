export type RealtimeServerToClientEvents = {
  heartbeat: (payload?: { at?: string }) => void;
  notification: (payload: {
    id: string;
    title: string;
    message?: string;
    createdAt: string;
  }) => void;
};
