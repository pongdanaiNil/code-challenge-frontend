import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { destroyAccessToken, destroyRefreshToken, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@utils/authCookie'
import { Mutex } from 'async-mutex'

const baseBody = {
	client_id: process.env.NEXT_PUBLIC_DOORKEEPER_UID,
	client_secret: process.env.NEXT_PUBLIC_DOORKEEPER_SECRET,
	grant_type: 'refresh_token'
}

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
	prepareHeaders(headers) {
		const token = getAccessToken()
		headers.set('authorization', `Bearer ${token}`)

		return headers
	}
})

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	console.log("process.env.NEXT_PUBLIC_API_ENDPOINT", process.env.NEXT_PUBLIC_API_ENDPOINT)
	// wait until the mutex is available without locking it
	await mutex.waitForUnlock()
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		// destroyAccessToken()
		// if (window) window.location.href = '/signin'
		// checking whether the mutex is locked
		if (!mutex.isLocked()) {
			const release = await mutex.acquire()
			try {
				const response = await baseQuery(
					{
						url: '/oauth/token',
						method: 'POST',
						body: { ...baseBody, refresh_token: getRefreshToken() }
					},
					api,
					extraOptions
				)
				if (response.data) {
					const res = response.data as any
					setAccessToken(res.access_token as string)
					setRefreshToken(res.refresh_token as string)

					// retry the initial query          
					result = await baseQuery(args, api, extraOptions)
				} else {
					// logout with destroy access_token and refresh_token cookie
					destroyAccessToken()
					destroyRefreshToken()
					window.location.href = '/signIn'
				}
			} finally {
				// release must be called once the mutex should be released again.
				release()
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock()
			result = await baseQuery(args, api, extraOptions)
		}


	} else if (result.error && result.error.status === 403 && window) window.location.href = '/403'
	else if (result.error && result.error.status === 404 && window) window.location.href = '/404'
	return result
}

export default customFetchBase
