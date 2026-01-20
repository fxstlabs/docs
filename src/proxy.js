import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
export { proxy } from 'nextra/locales'

let locales = ['en-US', 'nl-NL', 'nl']

function getLocale(request) {
    let headers = { 'accept-language': 'en-US,en;q=0.5' }
    let languages = new Negotiator({ headers }).languages()
    let locales = ['en', 'es']
    let defaultLocale = 'en'

    return match(languages, locales, defaultLocale)
}

export function proxy(request) {
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest|_pagefind).*)'
    ],
}