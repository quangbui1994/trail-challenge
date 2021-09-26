import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import moment from 'moment';
import { GET_ITINERARY } from '../../graphql';
import { DateTimePicker, LocalizationProvider, LoadingButton } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';
import { connect } from 'react-redux';
import { updateItineraries, updateOrigin, updateDestination } from '../../store/actions';
import { fetchPlaceData, getAddressList } from '../../axios';
import TimeTable from '../TimeTable/TimeTable';

const MainContent = ({ updateItineraries, updateOrigin, updateDestination, originData, destinationData }) => {
    const [value, setValue] = useState(moment.now());
    const [streetData, setStreetData] = useState([]);

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    /**
     * Automatically fetchs the number of streets contain the value of input 
     * and returns to the list which are the data of autocomplete
     * @param {String} val The input that users entered
     */
    const autoCompleteField = async (val) => {
        const result = await getAddressList(val);
        const streetData = result.map(result => {
            return { label: result.properties.label, locations: result.geometry.coordinates }
        });
        setStreetData(streetData);
    }

    const [getItinerary, { loading, error, data }] = useLazyQuery(GET_ITINERARY, {
        variables: {
            fromPlace: originData?.name, 
            toPlace: destinationData?.name,
            time: moment.unix(value / 1000).format("HH:mm:ss"),
            date: moment.unix(value / 1000).format("YYYY-MM-DD")
        },
    });

    /**
     * Look up the place base on the value of input by address search service
     * then return to the data which are then parsed to graph query
     * @param {String} val The value of field which is blur
     * @param {String} type The name of field input which is origin or destination
     * @returns Set the modified data which are parsed into graph query function later
     */
    const onBlurHandler = async (val, type) => {
        if (val) {
            const result = await fetchPlaceData(val);
            const { geometry, properties } = result[0];
            const placeData = {
                name: `${properties.name}, ${properties.localadmin}::${geometry.coordinates[1]},${geometry.coordinates[0]}`,
                location: geometry
            };
            return type === 'origin' ? updateOrigin(placeData) : updateDestination(placeData);
        }
    }

    useEffect(() => {
        if (data) {
            updateItineraries([...data.plan.itineraries]);
        }
    }, [data, updateItineraries]);

    return (
        <div style={{ width: '50%', paddingTop: '15%', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%', marginLeft: '0' },
                    display: 'flex',
                    flexFlow: 'column',
                    width: '60%',
                    margin: '0 auto'
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant='h3' style={{ marginBottom: '30px' }}>Where are you going?</Typography>
                <Autocomplete
                    fullWidth
                    onInputChange={(e) => autoCompleteField(e.target.value)}
                    onBlur={e => onBlurHandler(e.target.value,'origin')}
                    disablePortal
                    id="combo-box-demo"
                    options={streetData}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Origin" />}
                    />
                <Autocomplete
                    onInputChange={(e) => autoCompleteField(e.target.value)}
                    onBlur={e => onBlurHandler(e.target.value, 'destination')}
                    disablePortal
                    id="combo-box-demo"
                    options={streetData}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Destination" />}
                    />
                <LocalizationProvider style={{ width: '100%' }} dateAdapter={DateAdapter}>
                    <DateTimePicker
                        fullWidth
                        ampm={false}
                        label="Date&Time"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LoadingButton 
                    loading={loading}
                    variant="contained" 
                    color="primary" 
                    style={{ width: '100%', height: 40, marginTop: 10 }} 
                    onClick={getItinerary}>Search</LoadingButton>
            </Box>
            <TimeTable />
        </div>
    );
};

const mapStateToProps = state => ({
    originData: state.origin,
    destinationData: state.destination
})

const actionCreators = {
    updateOrigin, updateDestination, updateItineraries
}

export default connect(mapStateToProps, actionCreators)(MainContent);