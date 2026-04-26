"use client";

import {
  companySelectorData,
  documentPreviewData,
  filterDrawerData,
} from "../api/mocks/nfe-page-fixtures";

export function useNfePageData() {
  return {
    companySelectorData,
    documentPreviewData,
    filterDrawerData,
  };
}
