import { Tabs } from "@/components/ui/tabs";

type DocumentTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
};

export function DocumentTabs({ activeTab, onTabChange, tabs }: DocumentTabsProps) {
  return (
    <div className="rounded-t-lg bg-[var(--surface-control)]">
      <Tabs
        activeItem={activeTab}
        className="documents-tabs"
        items={tabs}
        onChange={onTabChange}
      />
    </div>
  );
}
