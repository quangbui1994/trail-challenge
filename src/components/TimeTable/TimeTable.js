import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import Itinerary from '../Itinerary/Itinerary';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsRailwayFilledIcon from '@mui/icons-material/DirectionsRailwayFilled';
import TramIcon from '@mui/icons-material/Tram';
import SubwayIcon from '@mui/icons-material/Subway';
import { Box } from '@mui/material';
import moment from 'moment';

const mapModeToIcon = {
  w: <DirectionsWalkIcon />,
  b: <DirectionsBusIcon />,
  t: <TramIcon />,
  s: <SubwayIcon />,
  r: <DirectionsRailwayFilledIcon />
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const TimeTable = ({ itineraries }) => {
  console.log(itineraries)
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getTransportationMode = itinerary => itinerary.legs.map(leg => mapModeToIcon[leg.mode.charAt(0).toLowerCase()]);

  const timeTable = itineraries.length ? 
    <div style={{ width: '100%', marginTop: '50px', height: 250, overflow: 'scroll' }}>
      {
        itineraries.map((itinerary, i) => (
          <Accordion sx={{ height: '500' }} key={i} expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)}>
            <AccordionSummary sx={{ 
              '& .MuiAccordionSummary-content': {
                display: 'flex',
                justifyContent: 'space-between'
              },
              '& .MuiButtonBase-root-MuiAccordionSummary-root': {
                height: 80
              }
            }} 
            aria-controls={`panel${i + 1}d-content`} id={`panel1d-header`}>
              <Typography>
                {moment.unix(itinerary.legs[0].startTime / 1000).format('MM/DD/YYYY HH:mm').split(' ')[1]} -
                {moment.unix(itinerary.legs[0].startTime / 1000 + itinerary.duration).format('MM/DD/YYYY HH:mm').split(' ')[1]}
              </Typography>
              <Box>{getTransportationMode(itinerary)}</Box>
              <Typography>{Math.floor(itinerary.duration / 60)} mins</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Itinerary itinerary={itinerary}/>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div> : null;

  return timeTable;
}

const mapStateToProps = state => ({
  itineraries: state.itineraries
});

export default connect(mapStateToProps)(TimeTable);
