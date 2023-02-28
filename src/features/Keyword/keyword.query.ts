import { createApi } from '@reduxjs/toolkit/query/react'
import { KeywordData, KeywordDataWithResult, KeywordsData, KeywordsQuery } from '@utils/interface'
import { HYDRATE } from 'next-redux-wrapper'
import customFetchBase from '../customFetchBase'

const reducerPath = 'keywordAPI'
export const keywordAPI = createApi({
	reducerPath,
	baseQuery: customFetchBase,
	tagTypes: ['Keywords', 'Keyword'],
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints(builder) {
		return {
			getKeywords: builder.query<KeywordsData, KeywordsQuery>({
				
				query: (query) => {
					const queryString = new URLSearchParams({ ...query }).toString()
					return {
						url: `/api/v1/keywords?${queryString}`,
						method: 'GET'
					}
				},
				providesTags: ['Keywords']
			}),
			getKeyword: builder.query<KeywordDataWithResult, string>({
				query: (id) => ({
					url: `/api/v1/keywords/${id}`,
					method: 'GET'
				}),
				providesTags: ['Keyword']
			}),
			uploadCSV: builder.mutation({
				query({ body }) {
					return {
						url: `/api/v1/keywords/upload`,
						method: 'POST',
						body: body,
					}
				},
				invalidatesTags: ['Keywords']
			}),
		}
	}
})

export const keywordQueryReducer = { [reducerPath]: keywordAPI.reducer }
// Client side
export const { 
	useGetKeywordsQuery,
	useGetKeywordQuery,
	useUploadCSVMutation
} = keywordAPI
