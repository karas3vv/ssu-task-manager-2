"use client";

import { ReactNode, useEffect } from "react";
import { StoreProvider, useRootStore } from "@shared/providers/store-provider";

type CommonWrapperProps = {
  children: ReactNode;
};

function ThemeBootstrap({ children }: CommonWrapperProps): JSX.Element {
  const { themeStore } = useRootStore();

  useEffect(() => {
    themeStore.detectTheme();
  }, [themeStore]);

  return <>{children}</>;
}

export function CommonWrapper({ children }: CommonWrapperProps): JSX.Element {
  return (
    <StoreProvider>
      <ThemeBootstrap>{children}</ThemeBootstrap>
    </StoreProvider>
  );
}
