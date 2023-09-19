import { createColumnHelper } from '@tanstack/react-table'
import SortableTable from '../components/SortableTable'
import useGetRestaurants from '../hooks/useGetRestaurants'
import { Restaurant } from '../types/Restaurants.types'

const columnHelper = createColumnHelper<Restaurant>()

const columns = [
	// columnHelper.accessor('_id', {
	// 	header: 'ID',
	// }),
	// columnHelper.group({
	// 	header: 'Restaurants',
	// 	columns: [
	columnHelper.accessor('name', {
		header: 'Name',
		cell: (props) => <span>{props.getValue()}</span>,
	}),
	columnHelper.accessor('address', {
		header: 'Adress',
		cell: (props) => <span> {props.getValue()}</span>,
	}),
	columnHelper.accessor('city', {
		header: 'City',
	}),
	columnHelper.accessor('category', {
		header: 'Category',
	}),

	// ],
	// }),
]

const SortedRestaurants = () => {
	const { data, loading } = useGetRestaurants()

	return (
		<>
			{/* <h1 className='my-5'>Users</h1> */}

			{/* {isError && <p>Oops, an error occurred!</p>} */}

			{loading && <p>Loading restaurants...</p>}

			{data && <SortableTable columns={columns} data={data} />}
		</>
	)
}

export default SortedRestaurants
