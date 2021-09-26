import moment from 'moment';

export const getDurationAsMinutesFromUnix = (start, end) => {
    const startTime = moment.unix(start / 1000);
    const endTime = moment.unix(end / 1000);
    return Math.ceil(moment.duration(endTime.diff(startTime)).asMinutes());
};