import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import customFetchBase from '../customFetchBase'

const reducerPath = 'userAPI'
export const userAPI = createApi({
	reducerPath,
	baseQuery: customFetchBase,
	tagTypes: ['User'],
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints(builder) {
		return {
			signUp: builder.mutation({
				query: (body) => ({
					url: '/api/v1/users/registration',
					method: 'POST',
					body: body
				}),
				invalidatesTags: ['User']
			})
		}
	}
})

export const userQueryReducer = { [reducerPath]: userAPI.reducer }
// Client side
export const { useSignUpMutation } = userAPI
