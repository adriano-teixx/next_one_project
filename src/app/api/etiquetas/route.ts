import { NextResponse } from "next/server";

export type DocumentLabel = {
  color: string;
  id: string;
  name: string;
  textColor?: string;
};

const labels: DocumentLabel[] = [
  { color: "#68c0ad", id: "api", name: "API", textColor: "#286b64" },
  { color: "#d83b72", id: "recusa-manual", name: "RECUSA MANUAL" },
  { color: "#697f8c", id: "sem-valor-fiscal", name: "SEM VALOR FISCAL" },
  {
    color: "#a9dcb1",
    id: "nf-entrada",
    name: "NF ENTRADA",
    textColor: "#6c9b73",
  },
  {
    color: "#68c0ad",
    id: "lcdo-09-25",
    name: "LÇDO 09/25",
    textColor: "#286b64",
  },
  { color: "#f6a537", id: "roit", name: "ROIT", textColor: "#8e5b16" },
  {
    color: "#68c0ad",
    id: "lcdo-07-25",
    name: "LÇDO 07/25",
    textColor: "#286b64",
  },
  {
    color: "#68c0ad",
    id: "lcdo-06-25",
    name: "LÇDO 06/25",
    textColor: "#286b64",
  },
];

export function GET() {
  return NextResponse.json({ labels });
}
