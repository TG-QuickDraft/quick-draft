import clsx from "clsx";

export type Tab = "emAndamento" | "semAtribuicao" | "todos";

type TabItem = {
  label: string;
  value: Tab;
};

type TabsProps = {
  tabs: readonly TabItem[];
  currentTab: Tab;
  onChange: (tab: Tab) => void;
};

export function Tabs({ tabs, currentTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-6 border-b border-gray-300 mb-6">
      {tabs.map((tab) => {
        const isActive = tab.value === currentTab;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={clsx(
              "pb-2 font-medium border-b-2 transition-colors cursor-pointer",
              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
