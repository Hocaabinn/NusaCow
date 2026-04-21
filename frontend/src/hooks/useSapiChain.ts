"use client";

import { useProgramMeta } from "@/context/ProgramProvider";

export function useSapiChain() {
  const meta = useProgramMeta();

  return {
    ...meta,
    actions: {
      initializeCow: "initialize_cow",
      investInCow: "invest_in_cow",
      distributeProfit: "distribute_profit",
    },
  };
}
