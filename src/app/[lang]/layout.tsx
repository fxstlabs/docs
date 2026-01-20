/* eslint-env node */
import type { Metadata } from 'next'
import {
    Footer,
    LastUpdated,
    Layout,
    LocaleSwitch,
    Navbar
} from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import { getDictionary, getDirection } from '@/app/dictionaries/get-dictionary'
import './globals.css'
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
    description:
        'The official FXST documentation where you can understand exactly how we operate.',
    title: {
        absolute: '',
        template: '%s | FXST Docs'
    },
    metadataBase: new URL('https://docs.fxst.tech'),
    appleWebApp: {
        title: 'FXST Docs'
    },
    other: {
        'msapplication-TileColor': '#d0c4c0'
    }
}

type LayoutProps = Readonly<{
    children: ReactNode
    params: Promise<{
        lang: string
    }>
}>

const RootLayout: FC<LayoutProps> = async ({ children, params }) => {
    const { lang } = await params
    const dictionary = await getDictionary(lang)
    const pageMap = await getPageMap(`/${lang}`)

    const banner = (
        <Banner storageKey="swr-2">
            {dictionary.banner}
        </Banner>
    )
    const navbar = (
        <Navbar
            logo={
                <>
                    <span
                        className="ms-2 font-extrabold select-none max-md:hidden"
                        title={"FXST Docs"}
                    >
            FXST Docs
          </span>
                </>
            }
            projectLink="https://github.com/fxstlabs/docs"
        >
            <LocaleSwitch lite />
        </Navbar>
    )
    const footer = (
        <Footer>
            <a
                rel="noreferrer"
                target="_blank"
                className="x:focus-visible:nextra-focus flex items-center gap-2 font-semibold"
                href='https://www.fxst.tech'
            >
                FXST {new Date().getFullYear()}. {dictionary.allRightsReserved}.
            </a>
        </Footer>
    )
    return (
        <html lang={lang} dir={getDirection(lang)} suppressHydrationWarning>
        <Head
            backgroundColor={{
                dark: 'rgb(17, 19, 24)',
                light: 'rgb(229, 231, 235)'
            }}
            color={{
                hue: { dark: 210, light: 215 },
                saturation: { dark: 100, light: 100 }
            }}
        />
        <body>
        <Layout
            banner={banner}
            navbar={navbar}
            footer={footer}
            docsRepositoryBase="https://github.com/fxstlabs/docs"
            i18n={[
                { locale: 'en', name: 'English' },
                { locale: 'es', name: 'Español' },
            ]}
            sidebar={{
                defaultMenuCollapseLevel: 1,
                autoCollapse: true
            }}
            toc={{
                backToTop: dictionary.backToTop,
            }}
            editLink={dictionary.editPage}
            pageMap={pageMap}
            nextThemes={{ defaultTheme: 'system' }}
            lastUpdated={<LastUpdated>{dictionary.lastUpdated}</LastUpdated>}
            themeSwitch={{
                dark: dictionary.dark,
                light: dictionary.light,
                system: dictionary.system
            }}
        >
            {children}
        </Layout>
        </body>
        </html>
    )
}

export default RootLayout