import { PageBreadcrumb } from "@/components/layout/page-breadcrumb";
import type { PageBreadcrumbItem } from "@/components/layout/page-breadcrumb";

type DocumentPageTitleProps = {
  breadcrumbItems?: PageBreadcrumbItem[];
  title: string;
};

export function DocumentPageTitle({
  breadcrumbItems,
  title,
}: DocumentPageTitleProps) {
  return (
    <header className="page-heading">
      <h1 className="text-[29px] font-bold leading-9 tracking-normal">
        {title}
      </h1>
      {breadcrumbItems?.length ? (
        <PageBreadcrumb items={breadcrumbItems} />
      ) : null}
    </header>
  );
}
