import React, { PropsWithChildren, useContext, useState } from "react";

import { TEXTS as ptbr } from "../constants/texts/ptbr";

export type SystemContextTypes = {
  language: typeof ptbr;
  setLanguage: (language: typeof ptbr) => void;
};

const SystemContext = React.createContext<SystemContextTypes>(
  {} as SystemContextTypes
);

export const SystemProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<typeof ptbr>(ptbr);

  return (
    <SystemContext.Provider value={{ language, setLanguage }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystemContext = () => useContext(SystemContext);
