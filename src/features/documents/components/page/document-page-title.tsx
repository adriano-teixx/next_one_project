import { PageBreadcrumb } from "@/components/layout/page-breadcrumb";
import type { PageBreadcrumbItem } from "@/components/layout/page-breadcrumb";

type DocumentPageTitleProps = {
  breadcrumbItems?: PageBreadcrumbItem[];
  title?: string;
};

export function DocumentPageTitle({
  breadcrumbItems,
}: DocumentPageTitleProps) {
  return (
    <header className="page-heading">
      {breadcrumbItems?.length ? (
        <PageBreadcrumb items={breadcrumbItems} />
      ) : null}
    </header>
  );
}
