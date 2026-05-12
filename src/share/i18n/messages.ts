import { Locale } from "@share/config/i18n";
import enMessages from "@share/i18n/messages/en.json";
import ruMessages from "@share/i18n/messages/ru.json";

type WidenStrings<T> = T extends string
  ? string
  : T extends Record<string, unknown>
    ? { [Key in keyof T]: WidenStrings<T[Key]> }
    : T;

export type Messages = WidenStrings<typeof ruMessages>;

const ru: Messages = ruMessages;
const en: Messages = enMessages;

export const messages: Record<Locale, Messages> = {
  ru,
  en
};
