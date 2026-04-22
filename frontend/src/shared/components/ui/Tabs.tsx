import type { TabItem } from "@/features/users/tabs.const";
import clsx from "clsx";

export type Tab = "emAndamento" | "semAtribuicao" | "todos";

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
              "flex items-center gap-2",
              "pb-2 font-medium border-b-2 transition-colors cursor-pointer",

              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black",
            )}
          >
            {tab.label}

            {typeof tab.total === "number" && (
              <span
                className={clsx(
                  "text-xs px-2 py-0.5 rounded-full",
                  isActive
                    ? "bg-black text-white"
                    : "bg-neutral-10 text-neutral-80",
                )}
              >
                {tab.total}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
