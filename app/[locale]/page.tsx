import { useTranslations } from 'next-intl';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'bn' }];
}

export default function Home() {
    const t = useTranslations('common');

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-bold text-center">
                    E-Commerce Platform
                </h1>
                <p className="text-lg text-center text-muted-foreground">
                    Full-stack e-commerce platform with admin dashboard
                </p>
                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                        {t('home')}
                    </button>
                    <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
                        {t('about')}
                    </button>
                </div>
            </main>
        </div>
    );
}