import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUser, signInResponse } from '@utils/interface'
import { authAPI } from './auth.query'
import { setAccessToken, destroyAccessToken, setRefreshToken, destroyRefreshToken } from '@utils/authCookie'

const reducerName = 'auth'
export const initialState: CurrentUser = {
	id: 0,
	name: '',
	email: ''
}

export const authSlice = createSlice({
	name: reducerName,
	initialState,
	reducers: {
		setUserState: (state: CurrentUser, { payload }: PayloadAction<CurrentUser>) => {
			state = payload
		},
		setAuthState: (state: CurrentUser, { payload }: PayloadAction<signInResponse>) => {
			setAccessToken(payload.access_token)
			setRefreshToken(payload.refresh_token)
		},
		clearAuthState(state) {
			state = initialState
			destroyAccessToken()
			destroyRefreshToken()
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(authAPI.endpoints.signIn.matchFulfilled, (state, { payload }: PayloadAction<signInResponse>) => {
			setAccessToken(payload.access_token)
			setRefreshToken(payload.refresh_token)
		})
	}
})

export const authSliceReducer = { [reducerName]: authSlice.reducer }

export const { setAuthState, clearAuthState, setUserState } = authSlice.actions
