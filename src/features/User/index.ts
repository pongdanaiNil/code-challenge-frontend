import { userQueryReducer } from './user.query'

const combineReducer = {
	...userQueryReducer,
}

export * from './user.query'
export default combineReducer
