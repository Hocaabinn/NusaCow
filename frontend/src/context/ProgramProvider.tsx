"use client";

import { PropsWithChildren, createContext, useContext } from "react";

import { getNusaCowProgramMeta } from "@/utils/idl";

type ProgramContextValue = {
  programName: string;
  programId: string;
};

const ProgramContext = createContext<ProgramContextValue | null>(null);

export function ProgramProvider({ children }: PropsWithChildren) {
  const value = getNusaCowProgramMeta();
  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>;
}

export function useProgramMeta() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgramMeta must be used inside ProgramProvider");
  }

  return context;
}
