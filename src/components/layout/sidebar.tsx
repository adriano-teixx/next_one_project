"use client";

import {
  ArrowDownUp,
  ArrowUpDown,
  Banknote,
  ChevronRight,
  CircleHelp,
  FileText,
  Home,
  LucideIcon,
  ReceiptText,
  RotateCw,
  Search,
} from "lucide-react";
import type { AppLayoutConfig } from "@/config/app-layout";
import { cn } from "@/lib/utils/cn";

type SidebarProps = {
  data: AppLayoutConfig["sidebar"];
};

const itemIconMap: Record<string, LucideIcon> = {
  "Boletos": ReceiptText,
  "CF-e SAT": FileText,
  "CT-e": FileText,
  "Gestão de Pagamentos": Banknote,
  "Home Qive": Home,
  "Importar XMLs": ArrowDownUp,
  "Integrações": ArrowUpDown,
  "MDF-e": FileText,
  "NF-e": FileText,
  "NF-e em Etapas": FileText,
  "NFC-e": FileText,
  "NFS-e": FileText,
  "Outros Documentos": FileText,
  "Recuperar Notas": Search,
  "Sincronizar Notas": RotateCw,
};

export function Sidebar({ data }: SidebarProps) {
  return (
    <aside className="app-sidebar bg-[var(--sidebar-bg)]">
      <nav aria-label="Menu principal" className="app-sidebar-panel">
        <div className="app-sidebar-content flex min-w-0 flex-col">
          {data.sections.map((section) => (
            <div key={section.title}>
              <p className="app-sidebar-section-title">
                {section.title}
              </p>
              <ul className="app-sidebar-section-list">
                {section.items.map((item) => {
                  const Icon = itemIconMap[item] ?? FileText;
                  const isActive =
                    item === data.activeItem &&
                    section.title === data.activeSection;

                  return (
                    <li key={`${section.title}-${item}`}>
                      <a
                        className={cn(
                          "app-sidebar-link",
                          isActive && "app-sidebar-link-active"
                        )}
                        href="#"
                      >
                        <Icon aria-hidden="true" />
                        <span>{item}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <a className="app-sidebar-help" href="#">
          <CircleHelp aria-hidden="true" />
          <span>
            <strong>Precisa de ajuda?</strong>
            <small>Acesse nossa central de ajuda</small>
          </span>
          <ChevronRight aria-hidden="true" />
        </a>
      </nav>
    </aside>
  );
}
