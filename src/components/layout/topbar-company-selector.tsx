"use client";

import { Check, ChevronDown, MapPin, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AppLayoutConfig } from "@/config/app-layout";
import type {
  CompanyBranch,
  CompanyBranchesResponse,
} from "@/shared/types/company-branch";

type TopbarCompanySelectorProps = {
  data: AppLayoutConfig["topbar"]["companySelector"];
};

export function TopbarCompanySelector({ data }: TopbarCompanySelectorProps) {
  const selectorRef = useRef<HTMLDivElement>(null);
  const hasInitializedSelectionRef = useRef(false);
  const [branches, setBranches] = useState<CompanyBranch[]>([]);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranchIds, setSelectedBranchIds] = useState<Set<string>>(
    () => new Set(),
  );
  const selectedBranches = useMemo(
    () => branches.filter((branch) => selectedBranchIds.has(branch.id)),
    [branches, selectedBranchIds],
  );
  const firstBranch = selectedBranches[0] ?? branches[0];
  const extraCount = Math.max(selectedBranches.length - 1, 0);
  const filteredBranches = useMemo(() => {
    const normalizedSearch = normalizeSearch(searchTerm);

    if (!normalizedSearch) {
      return branches;
    }

    return branches.filter((branch) =>
      normalizeSearch(formatBranchLabel(branch)).includes(normalizedSearch),
    );
  }, [branches, searchTerm]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBranches() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(data.endpoint, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Falha ao carregar filiais");
        }

        const payload = (await response.json()) as CompanyBranchesResponse;

        setBranches(payload.branches);
        if (!hasInitializedSelectionRef.current) {
          setSelectedBranchIds(
            new Set(payload.branches.slice(0, 3).map((branch) => branch.id)),
          );
          hasInitializedSelectionRef.current = true;
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchBranches();

    return () => controller.abort();
  }, [data.endpoint]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, []);

  function removeBranch(branchId: string) {
    setSelectedBranchIds((current) => {
      const next = new Set(current);
      next.delete(branchId);
      return next;
    });
  }

  function toggleBranch(branchId: string) {
    setSelectedBranchIds((current) => {
      const next = new Set(current);

      if (next.has(branchId)) {
        next.delete(branchId);
      } else {
        next.add(branchId);
      }

      return next;
    });
  }

  return (
    <div className="topbar-company-selector" ref={selectorRef}>
      <button
        aria-expanded={isOpen}
        className="topbar-company-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <MapPin aria-hidden className="topbar-company-pin" size={19} />
        {firstBranch ? (
          <span className="topbar-company-trigger-text">
            <strong>{firstBranch.state}</strong>
            <span>[{firstBranch.document}]</span>
            <span>{firstBranch.name}</span>
          </span>
        ) : (
          <span className="topbar-company-trigger-text">
            {isLoading ? "Carregando filiais..." : "Selecione uma filial"}
          </span>
        )}
        {extraCount > 0 ? (
          <span className="topbar-company-count">+{extraCount}</span>
        ) : null}
        <ChevronDown
          aria-hidden
          className="topbar-company-chevron"
          data-open={isOpen ? "true" : undefined}
          size={19}
        />
      </button>

      {isOpen ? (
        <div className="topbar-company-menu">
          <label className="topbar-company-search">
            <Search aria-hidden size={16} />
            <input
              autoComplete="off"
              autoFocus
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar filial por UF, CNPJ ou razão social"
              type="search"
              value={searchTerm}
            />
          </label>

          <div className="topbar-company-selected" aria-label="Filiais selecionadas">
            {selectedBranches.length > 0 ? (
              selectedBranches.map((branch) => (
                <span className="topbar-company-chip" key={branch.id}>
                  <strong>{branch.state}</strong>
                  <span className="topbar-company-chip-document">
                    [{branch.document}]
                  </span>
                  <span className="topbar-company-chip-name">{branch.name}</span>
                  <button
                    aria-label={`Remover ${branch.state}`}
                    className="topbar-company-chip-remove"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeBranch(branch.id);
                    }}
                    type="button"
                  >
                    <X aria-hidden size={14} />
                  </button>
                </span>
              ))
            ) : isLoading ? (
              <span className="topbar-company-empty-selection">
                Carregando filiais...
              </span>
            ) : hasError ? (
              <span className="topbar-company-empty-selection">
                Não foi possível carregar as filiais
              </span>
            ) : (
              <span className="topbar-company-empty-selection">
                Nenhuma filial selecionada
              </span>
            )}
          </div>

          <div className="topbar-company-options" role="listbox">
            {filteredBranches.map((branch) => {
              const isSelected = selectedBranchIds.has(branch.id);

              return (
                <button
                  aria-selected={isSelected}
                  className="topbar-company-option"
                  key={branch.id}
                  onClick={() => toggleBranch(branch.id)}
                  role="option"
                  type="button"
                >
                  <span
                    className="topbar-company-checkbox"
                    data-checked={isSelected ? "true" : undefined}
                  >
                    {isSelected ? <Check aria-hidden size={14} /> : null}
                  </span>
                  <span className="topbar-company-option-text">
                    <strong>{branch.state}</strong>
                    <span>[{branch.document}]</span>
                    <span>{branch.name}</span>
                  </span>
                </button>
              );
            })}
            {!isLoading && filteredBranches.length === 0 ? (
              <p className="topbar-company-empty-result">
                Nenhuma filial encontrada
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function formatBranchLabel(branch: CompanyBranch) {
  return `${branch.state} [${branch.document}] ${branch.name}`;
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}
