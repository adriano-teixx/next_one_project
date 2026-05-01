"use client";

import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { CompanySelectorData } from "../../types/document-page";

type CompanySelectorProps = {
  data: CompanySelectorData;
  showPicker?: boolean;
};

export function CompanySelector({ data, showPicker = true }: CompanySelectorProps) {
  const [isCompanyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [companySearch, setCompanySearch] = useState("");
  const companyPickerRef = useRef<HTMLDivElement>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const companyListId = useId();
  const [selectedCompanyIds, setSelectedCompanyIds] = useState(
    () => new Set(data.companies.map((company) => company.id)),
  );
  const isAllSelected = selectedCompanyIds.size === data.companies.length;
  const visibleCompanies = useMemo(
    () => data.companies.filter((company) => selectedCompanyIds.has(company.id)),
    [data.companies, selectedCompanyIds],
  );
  const filteredCompanies = useMemo(() => {
    const normalizedSearch = normalizeSearch(companySearch);

    if (!normalizedSearch) {
      return data.companies;
    }

    return data.companies.filter((company) =>
      normalizeSearch(company.label).includes(normalizedSearch),
    );
  }, [companySearch, data.companies]);

  useEffect(() => {
    function closeCompanyMenuOnOutsideClick(event: PointerEvent) {
      if (
        companyPickerRef.current &&
        !companyPickerRef.current.contains(event.target as Node)
      ) {
        setCompanyMenuOpen(false);
        setCompanySearch("");
      }
    }

    document.addEventListener("pointerdown", closeCompanyMenuOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeCompanyMenuOnOutsideClick);
    };
  }, []);

  function toggleCompany(companyId: string) {
    setSelectedCompanyIds((current) => {
      const next = new Set(current);

      if (next.has(companyId)) {
        next.delete(companyId);
      } else {
        next.add(companyId);
      }

      return next;
    });
  }

  function toggleAllCompanies() {
    setSelectedCompanyIds((current) =>
      current.size === data.companies.length
        ? new Set()
        : new Set(data.companies.map((company) => company.id)),
    );
  }

  function removeCompany(companyId: string) {
    setSelectedCompanyIds((current) => {
      const next = new Set(current);
      next.delete(companyId);
      return next;
    });
  }

  return (
    <div
      className="company-selector flex items-start justify-between gap-6"
      data-picker={showPicker ? "true" : "false"}
    >
      <div className="company-selector-main flex items-start gap-6">
        {showPicker ? (
          <div
            className="company-picker relative flex items-start rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-2 shadow-sm"
            data-open={isCompanyMenuOpen ? "true" : undefined}
            onClick={() => {
              setCompanyMenuOpen(true);
              companyInputRef.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setCompanyMenuOpen(false);
                setCompanySearch("");
              }
            }}
            ref={companyPickerRef}
          >
            <div className="company-picker-value flex min-w-0 flex-col items-start gap-1 pr-14">
              {visibleCompanies.slice(0, 3).map((company) => {
                const parsedCompany = parseCompanyLabel(company.label);

                return (
                  <span className="company-picker-chip" key={company.id}>
                    <strong>{parsedCompany.state}</strong>
                    <span className="company-picker-chip-document">
                      [{parsedCompany.document}]
                    </span>
                    <span className="company-picker-chip-name">
                      {parsedCompany.name}
                    </span>
                    <button
                      aria-label={`Remover ${parsedCompany.state}`}
                      className="company-picker-chip-remove"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeCompany(company.id);
                      }}
                      type="button"
                    >
                      <X aria-hidden size={14} />
                    </button>
                  </span>
                );
              })}
              {visibleCompanies.length > 3 || data.hiddenCompaniesCount > 0 ? (
                <span className="company-picker-more">
                  +{data.hiddenCompaniesCount + Math.max(visibleCompanies.length - 3, 0)}
                  {" "}outros
                </span>
              ) : null}
              <input
                aria-autocomplete="list"
                aria-controls={companyListId}
                aria-expanded={isCompanyMenuOpen}
                autoCapitalize="none"
                autoComplete="off"
                className="company-picker-input"
                onChange={(event) => setCompanySearch(event.target.value)}
                onFocus={() => setCompanyMenuOpen(true)}
                placeholder={visibleCompanies.length === 0 ? "Busque uma empresa" : ""}
                ref={companyInputRef}
                role="combobox"
                spellCheck={false}
                value={companySearch}
              />
            </div>
            <button
              aria-expanded={isCompanyMenuOpen}
              aria-label={isCompanyMenuOpen ? "Fechar empresas" : "Abrir empresas"}
              className="company-picker-toggle"
              onClick={(event) => {
                event.stopPropagation();
                if (isCompanyMenuOpen) {
                  setCompanyMenuOpen(false);
                  setCompanySearch("");
                  companyInputRef.current?.blur();
                  return;
                }

                setCompanyMenuOpen(true);
                companyInputRef.current?.focus();
              }}
              type="button"
            >
              {isCompanyMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isCompanyMenuOpen ? (
              <div className="company-picker-menu" id={companyListId} role="listbox">
                <button
                  className="company-picker-option"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={toggleAllCompanies}
                  type="button"
                >
                  <span
                    className="company-picker-checkbox"
                    data-checked={isAllSelected ? "true" : undefined}
                  >
                    {isAllSelected ? <Check size={18} /> : null}
                  </span>
                  Selecionar todos
                </button>
                {filteredCompanies.map((company) => {
                  const isSelected = selectedCompanyIds.has(company.id);

                  return (
                    <button
                      className="company-picker-option"
                      key={company.id}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => toggleCompany(company.id)}
                      type="button"
                    >
                      <span
                        className="company-picker-checkbox"
                        data-checked={isSelected ? "true" : undefined}
                      >
                        {isSelected ? <Check size={18} /> : null}
                      </span>
                      <span>{company.label}</span>
                    </button>
                  );
                })}
                {filteredCompanies.length === 0 ? (
                  <p className="company-picker-empty">Nenhuma empresa encontrada</p>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {showPicker ? (
          <a
            className="company-due-card flex items-center rounded-lg bg-[var(--warning-surface)] leading-tight text-[var(--muted)]"
            href={data.billingNotice.actionHref}
          >
            <span className="company-due-card-link shrink-0 font-bold">
              {data.billingNotice.actionLabel}
            </span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

function parseCompanyLabel(label: string) {
  const match = /^(?<state>\S+)\s+\[(?<document>[^\]]+)\]\s+(?<name>.+)$/.exec(
    label,
  );

  return {
    document: match?.groups?.document ?? "",
    name: match?.groups?.name ?? label,
    state: match?.groups?.state ?? "",
  };
}
