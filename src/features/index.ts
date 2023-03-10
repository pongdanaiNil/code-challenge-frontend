import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './User'
import authReducer from './Auth'
import keywordReducer from './Keyword'

export const combinedReducer = combineReducers({
	...userReducer,
	...authReducer,
	...keywordReducer
})
