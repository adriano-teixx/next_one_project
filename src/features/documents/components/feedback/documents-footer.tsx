import { ChevronDown } from "lucide-react";
import type { DocumentsFooterData } from "../../types/document-page";

type DocumentsFooterProps = {
  data: DocumentsFooterData;
};

export function DocumentsFooter({ data }: DocumentsFooterProps) {
  return (
    <footer className="documents-footer mt-8 pb-20">
      <div className="documents-pagination flex items-center text-[24px] text-[#565c69]">
        <div className="flex items-center gap-4">
          <span>{data.pageSizeLabel}</span>
          <button
            className="documents-page-size flex h-12 items-center gap-3 rounded-lg border border-[var(--border)] bg-[#f3f4f6] px-4 font-medium"
            type="button"
          >
            {data.pageSize} <ChevronDown size={19} />
          </button>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span>
            {data.rangePrefix} {data.rangeStart} - {data.rangeEnd} de{" "}
            {data.total.toLocaleString("pt-BR")} {data.totalLabel}
          </span>
          <button
            className="documents-page-button h-12 rounded-lg bg-[#eceef2] px-5 font-bold text-[#858a95]"
            type="button"
          >
            {data.previousLabel}
          </button>
          <button
            className="documents-page-button h-12 rounded-lg bg-[#f3f4f6] px-5 font-bold text-[#454b58]"
            type="button"
          >
            {data.nextLabel}
          </button>
        </div>
      </div>
      <div className="documents-copyright mt-28 flex items-center text-[22px] font-bold text-[#9297a2]">
        <p>{data.copyright}</p>
        <a className="ml-auto font-medium text-[#0648e7]" href={data.termsHref}>
          {data.termsLabel}
        </a>
      </div>
    </footer>
  );
}
