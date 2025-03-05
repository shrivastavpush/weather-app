import React, { useState } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import fetchCities from '../utils/FetchCities';


const SearchBox = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (event, value) => {
        setQuery(value);
        fetchCities(value, setOptions, setLoading);
    }

    const handleOnInputChange = (event, newValue) => {
        const selectedCity = options.find(city => city.label === newValue);
        console.log("selected city", selectedCity)
        onCitySelect(selectedCity ? selectedCity.value : '');
    };

    return (
        <div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Autocomplete
                freeSolo
                options={options.map(option => option.label)}
                loading={loading}
                onInputChange={handleOnChange}
                onChange={handleOnInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for a city"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );
};

export default SearchBox;
