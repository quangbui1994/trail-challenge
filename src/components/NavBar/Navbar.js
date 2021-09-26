import React from "react";
import { Box, Icon } from "@mui/material";
import { makeStyles } from '@material-ui/styles'; 
import TrailLogo from '../../assets/icons/trail.svg';

const useStyles = makeStyles({
    imageIcon: {
        display: 'flex',
        height: 'inherit',
        width: 'inherit',
        cursor: 'pointer'
    },
    iconRoot: {
        textAlign: 'center',
        height: '70px !important',
        width: '70px !important'
    }
});

export default () => {
    const classes = useStyles();
    return (
        <Box  
            sx={{ width: '100%', height: '70px', paddingX: '10%', paddingY: '10px', position: 'absolute' }} 
            display="flex" 
            bgcolor="white" p={2} alignItems="center">
            <Icon classes={{root: classes.iconRoot}}>
                <img className={classes.imageIcon} src={TrailLogo} alt="trail-logo" />
            </Icon>
        </Box>
    );
}