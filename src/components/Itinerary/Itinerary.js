import React from 'react';
import TimeSlot from './TimeSlot';
import moment from 'moment';
import { getDurationAsMinutesFromUnix } from '../../utils';

const Itinerary = ({ itinerary }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 30, marginTop: 30}}>
            {
                itinerary.legs.map(leg => {
                    const { startTime, endTime, mode, distance } = leg;
                    const duration = getDurationAsMinutesFromUnix(startTime, endTime);
                    
                    const data = {
                        mode,
                        startTime: moment.unix(startTime / 1000).format("MM/DD/YYYY HH:mm"),
                        endTime: moment.unix(endTime / 1000).format("MM/DD/YYYY HH:mm"),
                        from: leg.from,
                        to: leg.to,
                        distance,
                        duration
                    }
                    return <TimeSlot data={data}/>
                })
            }
        </div>
    )
};


export default Itinerary;