import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signInResponse } from '@utils/interface'
import { authAPI } from './auth.query'
import { setAccessToken, destroyAccessToken, setRefreshToken, destroyRefreshToken } from '@utils/authCookie'

const reducerName = 'auth'
export const initialState = {
}

export const authSlice = createSlice({
	name: reducerName,
	initialState,
	reducers: {
		setAuthState: (state, { payload }: PayloadAction<signInResponse>) => {
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
		builder.addMatcher(authAPI.endpoints.signIn.matchFulfilled, (_, { payload }: PayloadAction<signInResponse>) => {
			setAccessToken(payload.access_token)
			setRefreshToken(payload.refresh_token)
		}),
		builder.addMatcher(authAPI.endpoints.signOut.matchFulfilled, (_, { payload }) => {
			destroyAccessToken()
			destroyRefreshToken()
		})
	}
})

export const authSliceReducer = { [reducerName]: authSlice.reducer }

export const { setAuthState, clearAuthState } = authSlice.actions
