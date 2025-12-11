import React, { PropsWithChildren, useContext, useMemo, useState } from "react";

import { TEXTS as ptbr } from "../constants/texts/ptbr";

export enum Languages {
  PT_BR = "ptbr",
}

export type SystemContextTypes = {
  texts: typeof ptbr;
  language: Languages;
  setLanguage: (language: Languages) => void;
};

const SystemContext = React.createContext<SystemContextTypes>(
  {} as SystemContextTypes
);

export const SystemProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Languages>(Languages.PT_BR);

  const texts = useMemo(() => {
    if (language === Languages.PT_BR) {
      return ptbr;
    }
    return ptbr;
  }, [language]);

  return (
    <SystemContext.Provider value={{ texts, language, setLanguage }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystemContext = () => useContext(SystemContext);
