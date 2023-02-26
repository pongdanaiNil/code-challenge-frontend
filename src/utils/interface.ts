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

export interface CurrentUser {
	id: number
	name: string
	email: string
}
