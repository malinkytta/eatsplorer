import Map from '../components/Map'
import { Places } from '../../googleMapsConfig'
import { useLoadScript } from '@react-google-maps/api'
import { ScaleLoader } from 'react-spinners'

const HomePage = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries: Places,
	})

	if (!isLoaded)
		return (
			<div className='loader'>
				<ScaleLoader color={'#888'} speedMultiplier={1.1} />
			</div>
		)
	return (
		<>
			<Map />
		</>
	)
}

export default HomePage
