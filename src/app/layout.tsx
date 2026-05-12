import { ReactNode } from "react";
import { AuthWrapper } from "@widgets/wrappers/auth-wrapper";
import { CommonWrapper } from "@widgets/wrappers/common-wrapper";
import "./global.css";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <CommonWrapper>
          <AuthWrapper>{children}</AuthWrapper>
        </CommonWrapper>
      </body>
    </html>
  );
}
