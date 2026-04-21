import Script from "next/script";
import { Locale } from "@shared/config/i18n";
import { messages } from "@i18n/messages";

type SchemaOrgProps = {
  locale: Locale;
};

export function SchemaOrg({ locale }: SchemaOrgProps): JSX.Element {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: messages[locale].common.appName,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    url: `http://localhost:3000/${locale}`,
    description: messages[locale].metadata.description
  };

  return (
    <Script
      id="schema-org-taskflow"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
