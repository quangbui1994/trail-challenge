import React, { useMemo } from 'react'
import { GoogleMap, useJsApiLoader, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { connect } from 'react-redux';
import { useCallback, useState, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const Map = ({ origin, destination }) => {
    const [map, setMap] = useState(null);
    const [response, setResponse] = useState(null);

    //Loading the Google Map script with API key
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    });

    //Set the map variable after loading
    const onLoad = useCallback((map) => setMap(map), []);

    //Remove map variable when map is unmounted
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, []);

    //The callback function check the response from directions service 
    //and conditionally load the directions render
    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response);
            } else {
                console.log('response: ', response)
            }
        }
    }
    
    //Parse the origin and destination coordinates to the direction service
    const DirectionsServiceOption = useMemo(() => {
        return (
            {
                destination: {lat: destination?.location.coordinates[1], lng: destination?.location.coordinates[0]},
                origin: {lat: origin?.location.coordinates[1], lng: origin?.location.coordinates[0]},
                travelMode: "TRANSIT",
            }
        );
    }, [destination, origin]);

    //Rebound the map every single time origin or destination changed
    //in order to make map focus and zoom in both of them
    useEffect(() => {
        if (map && (origin || destination)) {
            const bounds = new window.google.maps.LatLngBounds();
            [origin, destination].forEach(marker => {
                if (marker) {
                    bounds.extend({
                        lat: marker?.location.coordinates[1],
                        lng: marker?.location.coordinates[0],
                    });
                }
            });
            map.fitBounds(bounds);
        }
    }, [map, origin, destination]);
    
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ 
                lat: origin?.location.coordinates[1] || -34.397,
                lng: origin?.location.coordinates[0] || 150.644
            }}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {response !== null && (
                <DirectionsRenderer
                    options={{
                    directions: response,
                    }}
                />
            )}

            <DirectionsService
                options={DirectionsServiceOption}
                callback={directionsCallback}
            />
        </GoogleMap>
    ) : <></>
}

const mapStateToProps = state => ({
    origin: state.origin,
    destination: state.destination
});

export default connect(mapStateToProps)(Map);