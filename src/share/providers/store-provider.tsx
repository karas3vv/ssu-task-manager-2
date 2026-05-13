"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { RootStore } from "@share/store";

const StoreContext = createContext<RootStore | null>(null);

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps): JSX.Element {
  const storeRef = useRef<RootStore | null>(null);

  if (storeRef.current === null) {
    storeRef.current = new RootStore();
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
}

export function useRootStore(): RootStore {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error("useRootStore must be used inside StoreProvider");
  }

  return store;
}
