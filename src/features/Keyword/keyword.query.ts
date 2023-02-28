import { createApi } from '@reduxjs/toolkit/query/react'
import { KeywordsData } from '@utils/interface'
import { HYDRATE } from 'next-redux-wrapper'
import customFetchBase from '../customFetchBase'

const reducerPath = 'keywordAPI'
export const keywordAPI = createApi({
	reducerPath,
	baseQuery: customFetchBase,
	tagTypes: ['Keywords'],
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints(builder) {
		return {
			getKeywords: builder.query<KeywordsData, void>({
				query: () => ({
					url: '/api/v1/keywords',
					method: 'GET'
				}),
				providesTags: ['Keywords']
			})
		}
	}
})

export const keywordQueryReducer = { [reducerPath]: keywordAPI.reducer }
// Client side
export const { useGetKeywordsQuery } = keywordAPI
