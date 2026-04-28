"use client";

import { CSSProperties, ReactNode } from "react";

type BackButtonProps = {
  children: ReactNode;
  className?: string;
  fallbackHref?: string;
  style?: CSSProperties;
};

export function BackButton({ children, className, fallbackHref = "/ru/dashboard", style }: BackButtonProps): JSX.Element {
  function handleBack(): void {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = fallbackHref;
  }

  return (
    <button className={className} style={style} type="button" onClick={handleBack}>
      {children}
    </button>
  );
}
