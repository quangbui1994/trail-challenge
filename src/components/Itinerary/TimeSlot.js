import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import { StepContent, Step, Typography } from '@mui/material';
import StepLabel from '@mui/material/StepLabel';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TramIcon from '@mui/icons-material/Tram';
import SubwayIcon from '@mui/icons-material/Subway';
import DirectionsRailwayFilledIcon from '@mui/icons-material/DirectionsRailwayFilled';

const TimeSlot = ({ data: { mode, from, to, distance, duration } }) => {
    const steps = [
        { label: `${from.name} ${from.stop?.code ? from.stop?.code : ''}`, description: `${duration} mins` },
        { label: mode, description: `${Math.round(distance)} m` },
        { label:`${to.name} ${to.stop?.code ? to.stop?.code : ''}`, description: '' }
    ];
    
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper 
                style={{ height: 80 }} 
                alternativeLabel>
                {steps.map((step, i) => {
                    return (
                        <Step active = {true} key={step.label}>
                            <StepLabel 
                                sx={{ 
                                    '& .MuiStepLabel-iconContainer': {
                                        transform: `${i === 1 ? 'scale(1.5)' : 'scale(.7)'}`
                                    },
                                    '& .MuiStepIcon-text': {
                                        display: 'none'
                                    },
                                    '& .MuiStepLabel-labelContainer': {
                                        width: 140
                                    }
                                }}
                                StepIconComponent={
                                    step.label === 'WALK' ? DirectionsWalkIcon
                                    : step.label === 'BUS' ? DirectionsBusIcon
                                    : step.label === 'TRAM' ? TramIcon
                                    : step.label === 'SUBWAY' ? SubwayIcon
                                    : step.label === 'RAIL' ? DirectionsRailwayFilledIcon
                                    : null
                                }
                            >{step.label}</StepLabel>
                            <StepContent sx={{
                                '& .MuiCollapse-root': {
                                    position: 'absolute',
                                    top: '-5px',
                                    left: '190px',
                                    borderLeft: 'none'
                                }
                            }}>
                                <Typography>{step.description}</Typography>
                            </StepContent>
                        </Step>
                    )
                })}
            </Stepper>
        </Box>
    );
};

export default TimeSlot;