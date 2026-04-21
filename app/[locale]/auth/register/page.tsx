import { resolveLocale } from "@shared/config/i18n";
import { AuthForm } from "@features/auth/auth-form";
import { createMetadata } from "@shared/seo/metadata";

type RegisterPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: RegisterPageProps) {
  const { locale } = await params;
  return createMetadata(locale, "Регистрация", "Создание аккаунта TaskFlow.");
}

export default async function RegisterPage({ params }: RegisterPageProps): Promise<JSX.Element> {
  const { locale } = await params;
  return <AuthForm locale={resolveLocale(locale)} mode="register" />;
}
