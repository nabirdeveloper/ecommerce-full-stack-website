import { getRequestConfig } from 'next-intl/server';

// @ts-expect-error
export default getRequestConfig(async ({ locale }) => {
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});