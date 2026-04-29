import type { Route } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type PageBreadcrumbItem = {
  href?: Route;
  label: string;
};

type PageBreadcrumbProps = {
  items: PageBreadcrumbItem[];
};

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <Breadcrumb className="page-breadcrumb">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <BreadcrumbItem key={`${item.label}-${index}`}>
              {item.href && !isLastItem ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
              {!isLastItem ? <BreadcrumbSeparator /> : null}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
