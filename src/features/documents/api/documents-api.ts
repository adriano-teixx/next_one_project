import type { DocumentListParams, DocumentListResponse } from "../types/document";

export async function getDocuments(
  params: DocumentListParams = {},
): Promise<DocumentListResponse> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 25;
  const purpose = params.purpose ?? "recebidas";
  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    purpose,
  });

  const response = await fetch(`/api/notas?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar as notas");
  }

  return (await response.json()) as DocumentListResponse;
}
