export interface signInData {
	email: string
	password: string
}

export interface signInResponse {
	id: number
	name: string
	email: string
	access_token: string
	refresh_token: string
}

export interface SkeletonPaginateTableProps {
	columns: Column[]
	isFetching: boolean
	perPage: number
	page: number
	debounceChange: (page: number, perPage: number) => void
	tableData?: KeywordsData
}

export interface Action {
	action: string
	url?: string
	onDelete?: (id: number) => void
	onRefresh?: (emId: number) => void
	dialogTitle?: string
	dialogContent?: string
}

export interface Column {
	id: string
	actions?: Action[]
	label?: string
	field?: string
	path?: string
}

export interface KeywordsData {
	data: KeywordData[]
	count: number
}

export interface KeywordData {
	id: number
	keyword: string
}

export interface SkeletonPaginateTableProps {
	columns: Column[]
	isFetching: boolean
	perPage: number
	page: number
	debounceChange: (page: number, perPage: number) => void
	tableData?: KeywordsData
}
