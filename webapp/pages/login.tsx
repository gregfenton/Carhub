import Typography from "@mui/material/Typography"
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField } from "@mui/material";

const useStyles = makeStyles(theme => ({
    root: {
        display: "inline-grid",
        margin: "auto",
        position:"fixed",
        top: "50%",
        left: "50%",
        width:"30em",
        height:"18em",
        marginTop: "-9em", 
        marginLeft: "-15em", 
        border: "1px solid #ccc",
    },
    loginButton: {
        border: "1px solid #ccc",
        width: "30%",
        height: "80%",
        margin: "auto"
    },
    loginText: {
        margin: "auto"
    }
}));

export default function LoginPage() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <Typography className ={classes.loginText}>Login</Typography>
                <TextField id="filled-basic" label="Email Adresse" variant="standard"></TextField>
                <TextField id="filled-basic" label="Passwort" variant="standard" />
                <Button className={classes.loginButton}>Login</Button>
            </div>
        </>
    );
}