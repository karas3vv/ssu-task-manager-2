"use client";

import { ReactNode } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};

export function AuthWrapper({ children }: AuthWrapperProps): JSX.Element {
  return <>{children}</>;
}
