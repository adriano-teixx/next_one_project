import type { Route } from "next";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
                  <Link href={item.href}>
                    {index === 0 && item.label === "Home" ? (
                      <Home aria-hidden size={14} />
                    ) : null}
                    {index > 0 ? <ChevronRight aria-hidden size={14} /> : null}
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  {index > 0 ? <ChevronRight aria-hidden size={14} /> : null}
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
