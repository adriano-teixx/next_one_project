import { AppShell } from "@/components/layout/app-shell";
import { PageBreadcrumb } from "@/components/layout/page-breadcrumb";

export default function HomePage() {
  return (
    <AppShell>
      <main aria-label="Home" className="app-content">
        <div className="page-heading">
          <h1 className="text-[29px] font-bold leading-9 tracking-normal">
            Home
          </h1>
          <PageBreadcrumb items={[{ label: "Home" }]} />
        </div>
      </main>
    </AppShell>
  );
}
