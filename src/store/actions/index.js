export const updateItineraries = (itineraries) => ({
    type: 'itinerary/update',
    payload: itineraries
});

export const updateOrigin = (originData) => ({
    type: 'origin/update',
    payload: originData
});

export const updateDestination = (destinationData) => ({
    type: 'destination/update',
    payload: destinationData
});
