"use client";

import { useEffect, useState } from "react";
import { getDocuments } from "../api/documents-api";
import type {
  DocumentListParams,
  DocumentListResponse,
} from "../types/document";

type DocumentsQueryState = {
  data: DocumentListResponse | null;
  error: Error | null;
  isLoading: boolean;
};

export function useDocumentsQuery(params: DocumentListParams = {}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 25;
  const purpose = params.purpose ?? "recebidas";
  const [state, setState] = useState<DocumentsQueryState>({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    let isCurrent = true;

    async function loadDocuments() {
      setState((currentState) => ({
        ...currentState,
        error: null,
        isLoading: true,
      }));

      try {
        const data = await getDocuments({ page, pageSize, purpose });

        if (!isCurrent) {
          return;
        }

        setState({
          data,
          error: null,
          isLoading: false,
        });
      } catch (error) {
        if (!isCurrent) {
          return;
        }

        setState({
          data: null,
          error: error instanceof Error ? error : new Error("Erro inesperado"),
          isLoading: false,
        });
      }
    }

    void loadDocuments();

    return () => {
      isCurrent = false;
    };
  }, [page, pageSize, purpose]);

  return state;
}
