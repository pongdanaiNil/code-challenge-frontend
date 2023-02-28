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

export interface KeywordsQuery {
	keyword?: string
	page: string
	limit: string
}

export interface KeywordsData {
	data: KeywordData[]
	count: number
}

export interface KeywordData {
	id: number
	keyword: string
}

export interface KeywordDataWithResult {
	data: {
		id: number
		keyword: string
	}
	result: {
		adwords_advertisers_count: number
		links_count: number
		total_search_results: string
		html_code: string
	}
}

export interface SkeletonPaginateTableProps {
	columns: Column[]
	isFetching: boolean
	perPage: number
	page: number
	debounceChange: (page: number, perPage: number) => void
	tableData?: KeywordsData
}

export interface ResultFormProps {
	keyword: string
	adwordsAdvertisers: number
	links: number
	totalSearchResults: string
	htmlCode: string
}

export interface ErrorResponse {
	data: {
		message: string
	}
	status: number
}