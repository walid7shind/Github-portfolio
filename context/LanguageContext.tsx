"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { content } from "@/lib/data";

interface LanguageContextType {
  t: typeof content.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider
      value={{
        t: content.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
