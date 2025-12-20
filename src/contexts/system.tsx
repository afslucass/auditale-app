import React, { PropsWithChildren, useContext, useMemo, useState } from "react";

import { TEXTS as ptbr } from "../constants/texts/ptbr";
import { Language } from "../types/global";

export type SystemContextTypes = {
  texts: typeof ptbr;
  language: Language;
  setLanguage: (language: Language) => void;
};

const SystemContext = React.createContext<SystemContextTypes>(
  {} as SystemContextTypes
);

export const SystemProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>(Language.PT_BR);

  const texts = useMemo(() => {
    if (language === Language.PT_BR) {
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
