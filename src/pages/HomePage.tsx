import Map from '../components/Map'
import { Places } from '../../googleMapsConfig'
import { useLoadScript } from '@react-google-maps/api'

const HomePage = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries: Places,
	})

	if (!isLoaded) return <div>loading..</div>
	return (
		<>
			<Map />
		</>
	)
}

export default HomePage
