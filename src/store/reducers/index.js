const INITIAL_STATE = {
    itineraries: [],
    origin: null,
    destination: null
};

const updateItineraries = (state, action) => {
    const itineraries = action.payload;
    return {...state, itineraries};
}

const updateOrigin = (state, action) => {
    return {...state, origin: action.payload}
};

const updateDestination = (state, action) => {
    return {...state, destination: action.payload}
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'itinerary/update':
            return updateItineraries(state, action);
        case 'origin/update':
            return updateOrigin(state, action);
        case 'destination/update':
            return updateDestination(state, action);
        default:
            return state;
    }
};