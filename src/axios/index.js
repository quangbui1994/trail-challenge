import axios from 'axios';

const baseUri = 'https://api.digitransit.fi/geocoding/v1';

export const fetchPlaceData = async (val) => {
    return await (await axios.get(`${baseUri}/search?text=${val}&size=1`)).data.features;
}

export const getAddressList = async (val) => {
    return await (await axios.get(`${baseUri}/autocomplete?text=${val}&layers=address`)).data.features;
}