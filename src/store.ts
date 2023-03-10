import { configureStore } from '@reduxjs/toolkit'
import { combinedReducer } from './features'
import { createWrapper } from 'next-redux-wrapper'
import { authAPI } from '@features/Auth/auth.query'
import { userAPI } from '@features/User/user.query'
import { keywordAPI } from '@features/Keyword/keyword.query'

export const makeStore = () =>
	configureStore({
		reducer: combinedReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware()
			.concat(authAPI.middleware)
			.concat(userAPI.middleware)
			.concat(keywordAPI.middleware)
		}
	})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
