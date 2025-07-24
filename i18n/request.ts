import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "bn"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as string)) notFound();

  const validatedLocale = locale as string;

  return {
    locale: validatedLocale,
    messages: (await import(`../messages/${validatedLocale}.json`)).default,
  };
});
