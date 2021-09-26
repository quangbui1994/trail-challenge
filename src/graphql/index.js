import { gql } from "apollo-boost";

export const GET_ITINERARY = gql`
    query GetItinerary($fromPlace: String, $toPlace: String, $time: String, $date: String) {
        plan(
            fromPlace: $fromPlace,
            toPlace: $toPlace,
            time: $time,
            date: $date,
            numItineraries: 20
        ) {
            itineraries{
                walkDistance,
                duration,
                legs {
                mode
                startTime
                endTime
                from {
                    lat
                    lon
                    name
                    stop {
                        code
                        name
                    }
                },
                to {
                    lat
                    lon
                    name
                    stop {
                        code
                        name
                    }
                },
                distance
                legGeometry {
                    length
                    points
                }
                }
            }
        }
  }
`;