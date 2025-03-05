import axios from 'axios';
import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';

const fetchCities = debounce(async (input, setOptions, setLoading) => {
	if (!input) return;
	setLoading(true);

	try {
		const response = await axios.get(
			`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}`,
			{
				headers: {
					'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
					'X-RapidAPI-Host': import.meta.env.VITE_GEODB_HOST,
				},
			}
		);

		setOptions(response.data.data.map((city) => ({
			label: city.type === "CITY" ? `${city.city}, ${city.region}, ${city.countryCode}` : '',
			value: city.type === "CITY" ? `${city.city}, ${city.region}, ${city.countryCode}` : '',
			id: city.id || uuidv4(),
		})));
		console.log("all cities", response.data.data);
	} catch (error) {
		console.error('Error fetching cities:', error);
	}

	setLoading(false);
}, 1000);

export default fetchCities;
