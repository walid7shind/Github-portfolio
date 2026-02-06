"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type ProjectTab = {
  id: string;
  label: string;
};

export default function ProjectTabs({ tabs }: { tabs: ProjectTab[] }) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? "overview");

  const sectionIds = useMemo(() => tabs.map((t) => t.id), [tabs]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        // Header is 64px; give extra padding so active tab changes naturally.
        rootMargin: "-96px 0px -70% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div className="sticky top-16 z-40 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-3">
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <Link
                key={tab.id}
                href={`#${tab.id}`}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                  (isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted")
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
