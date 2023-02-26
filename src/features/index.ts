import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './User'
import authReducer from './Auth'

export const combinedReducer = combineReducers({
	...userReducer,
	...authReducer
})
