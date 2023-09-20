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
	latLng: {
		lat: number
		lng: number
	}
	isConfirmedByAdmin: boolean
}
