import { Tabs } from "@/components/ui/tabs";

type DocumentTabsProps = {
  activeTab: string;
  tabs: string[];
};

export function DocumentTabs({ activeTab, tabs }: DocumentTabsProps) {
  return (
    <div className="rounded-t-lg bg-[var(--surface-control)]">
      <Tabs activeItem={activeTab} className="documents-tabs" items={tabs} />
    </div>
  );
}
