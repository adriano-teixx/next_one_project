import type { DocumentsEmptyHintData } from "../../types/document-page";

type DocumentsEmptyHintProps = {
  data: DocumentsEmptyHintData;
};

export function DocumentsEmptyHint({ data }: DocumentsEmptyHintProps) {
  return (
    <div className="documents-empty-hint rounded-b-lg border-t border-[var(--border)] bg-[#f7f7f9] px-6 py-4 text-[20px] text-[#555b68]">
      {data.message}{" "}
      <a className="font-bold text-[#0648e7]" href={data.actionHref}>
        {data.actionLabel}
      </a>
    </div>
  );
}
