"use client";

import { ReactNode } from "react";
import { AuthWrapper } from "@shared/providers/auth-wrapper";
import { CommonWrapper } from "@shared/providers/common-wrapper";

type RootWrapperProps = {
  children: ReactNode;
};

export function RootWrapper({ children }: RootWrapperProps): JSX.Element {
  return (
    <CommonWrapper>
      <AuthWrapper>{children}</AuthWrapper>
    </CommonWrapper>
  );
}
