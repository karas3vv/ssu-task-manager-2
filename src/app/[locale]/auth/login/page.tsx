import { resolveLocale } from "@share/config/i18n";
import { AuthForm } from "@feature/auth/auth-form";
import { createMetadata } from "@share/seo/metadata";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LoginPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Авторизация", "Вход в личный кабинет TaskFlow.");
}

export default async function LoginPage({ params }: LoginPageProps): Promise<JSX.Element> {
  const { locale } = await params;
  return <AuthForm locale={resolveLocale(locale)} mode="login" />;
}
