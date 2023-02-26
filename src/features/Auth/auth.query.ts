import { createApi } from '@reduxjs/toolkit/query/react'
import { signInData, signInResponse } from '@utils/interface'
import { HYDRATE } from 'next-redux-wrapper'
import customFetchBase from '../customFetchBase'

const baseBody = {
	client_id: process.env.NEXT_PUBLIC_DOORKEEPER_UID,
	client_secret: process.env.NEXT_PUBLIC_DOORKEEPER_SECRET,
	grant_type: 'password'
}

const reducerPath = 'authAPI'
export const authAPI = createApi({
	reducerPath,
	baseQuery: customFetchBase,
	tagTypes: ['Auth'],
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints(builder) {
		return {
			signIn: builder.mutation< signInResponse, signInData>({
				query: (body) => ({
					url: '/oauth/token',
					method: 'POST',
					body: { ...baseBody, ...body}
				}),
				invalidatesTags: ['Auth']
			})
		}
	}
})

export const authQueryReducer = { [reducerPath]: authAPI.reducer }
// Client side
export const { useSignInMutation } = authAPI
