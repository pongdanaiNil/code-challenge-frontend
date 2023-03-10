import { keywordQueryReducer } from './keyword.query'

const combineReducer = {
	...keywordQueryReducer,
}

export * from './keyword.query'
export default combineReducer
