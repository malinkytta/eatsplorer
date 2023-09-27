export type Restaurant = {
	_id: string
	name: string
	address: string
	city: string
	description: string
	category: string
	offer: string
	email?: string
	phone?: string
	website?: string
	instagram?: string
	facebook?: string
	lat: number
	lng: number
	isConfirmedByAdmin: boolean
	distance: number
	photo: string
}

export type RestaurantImage = {
	_id: string
	name: string
	path: string
	size: number
	type: string
	restaurant: string
	approved: boolean
	uid: string
	url: string
}
