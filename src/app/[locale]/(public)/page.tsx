import { LandingPage } from "@widgets/landing/landing-page";
import { resolveLocale } from "@share/config/i18n";

type LandingRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function LandingRoute({ params }: LandingRouteProps): Promise<JSX.Element> {
  const { locale } = await params;

  return <LandingPage locale={resolveLocale(locale)} />;
}
