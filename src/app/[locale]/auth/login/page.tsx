import { resolveLocale } from "@share/config/i18n";
import { AuthForm } from "@feature/auth/auth-form";
import { createMetadata } from "@share/seo/metadata";
import { messages } from "@share/i18n/messages";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LoginPageProps) {
  const { locale } = await params;
  const t = messages[resolveLocale(locale)].metadata;
  return createMetadata(locale, t.loginTitle, t.loginDescription);
}

export default async function LoginPage({ params }: LoginPageProps): Promise<JSX.Element> {
  const { locale } = await params;
  return <AuthForm locale={resolveLocale(locale)} mode="login" />;
}
