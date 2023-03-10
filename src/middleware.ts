import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone()
	const accessToken = req.cookies.get('accessToken')

	const allowPaths: RegExp[] = [
		/\/_next\/static\//,
		/\/android-icon/,
		/\/favicons\//,
		/\/favicon.ico/,
		/\/serviceworker.js/,
		/\/_next\/image/,
		/\/signUp/,
	]

	if (allowPaths.some((path) => url.pathname.match(path))) {
		// return void 0;
		return NextResponse.rewrite(url)
	}
	const ignorePath = ['/signIn', '/signUp']
	
	if (!!accessToken && ignorePath.includes(url.pathname)) {
		//have token

		url.pathname = '/'
		return NextResponse.redirect(url)
	}

	if (!accessToken && url.pathname != '/signIn') {
		url.pathname = '/signIn'
		return NextResponse.redirect(url)
	}

	return NextResponse.rewrite(url)
}
