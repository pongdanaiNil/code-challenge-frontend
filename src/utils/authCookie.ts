import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { GetServerSidePropsContext, NextPageContext } from 'next'

let contextType: GetServerSidePropsContext | NextPageContext

export const setAccessToken = (token: string, ctx?: typeof contextType) =>
	setCookie(ctx, 'accessToken', token, {
		maxAge: 8 * 60 * 60,
		secure: process.env.APP_ENV !== 'development',
		path: '/',
		sameSite: 'lax'
	})

export const getAccessToken = (ctx?: typeof contextType) => parseCookies(ctx).accessToken

export const setRefreshToken = (token: string, ctx?: typeof contextType) =>
	setCookie(ctx, 'refresh_token',token, {
		maxAge: 3 * 24 * 60 * 60,
		secure: process.env.APP_ENV !== 'development',
		path: '/',
		sameSite: 'lax'
	})

export const getRefreshToken = (ctx?: typeof contextType) => parseCookies(ctx).refresh_token

export const destroyAccessToken = (ctx?: typeof contextType) => destroyCookie(ctx, 'accessToken', { path: '/' })

export const destroyRefreshToken = (ctx?: typeof contextType) => destroyCookie(ctx, 'refresh_token', { path: '/' })
