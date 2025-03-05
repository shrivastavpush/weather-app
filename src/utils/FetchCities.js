import axios from 'axios';
import debounce from 'lodash.debounce';

const fetchCities = debounce(async (input, setOptions, setLoading) => {
	if (!input) return;
	setLoading(true);

	try {
		const response = await axios.get(
			`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}`,
			{
				params: { limit: 10, includeDeleted: 'NONE' },
				headers: {
					'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
					'X-RapidAPI-Host': import.meta.env.VITE_GEODB_HOST,
				},
			}
		);

		const cityData = response.data.data

		const uniqueCities = [];
		const seenKeys = new Set();
		const seenRegionWdIds = new Set();

		cityData
			.filter(city => city.population > 0) // Removing all cities with population = 0
			.forEach(city => {
				const cityKey = `${city.city}-${city.region}-${city.country}`; // Unique key with city, region, country
				const regionWdId = city.regionWdId; // Unique regionWdId

				if (!seenKeys.has(cityKey) && !seenRegionWdIds.has(regionWdId)) {
					seenKeys.add(cityKey);
					seenRegionWdIds.add(regionWdId);
					uniqueCities.push(city);
				}
			});

		console.log(cityData);
		console.log(uniqueCities);

		setOptions(uniqueCities.map((city) => ({
			label: `${city.city}, ${city.region}, ${city.countryCode}`,
			value: `${city.city}`,
			id: city.id,
		})));
	} catch (error) {
		console.error('Error fetching cities:', error);
	}

	setLoading(false);
}, 1000);

export default fetchCities;
