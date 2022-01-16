import React, { useState, useEffect } from 'react';
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20,
        height: "100%",
        width: "60%",
        margin: "0 auto !important",
    },
    avatar: {
        background: "gray",
        marginBottom: "2vh"
    },
    button: {
        margin: '8px 0'
    }
}));

// #61892F
// #86C232
// #222629
// #474B4f
// #6B6E70

export default function LoginPage() {
    const classes = useStyles();
    
    return (<>
        <Grid>
            <Paper elevation={10} className={classes.paper}>
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center">
                    <h2>Sign in</h2>
                    <Avatar className={classes.avatar}><LockOutlined /></Avatar>
                    <TextField label="Email adresse" placeholder="Email adresse" fullWidth required variant="standard"></TextField>
                    <TextField label="Passwort" placeholder="Password" required fullWidth type="password" variant="standard"></TextField>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" className={classes.button} fullWidth>Sign in</Button>
                    <Typography >
                        <Link href="#" >
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography > Do you have an account? 
                        <Link href="#" style={{marginLeft: "1vh"}}>Sign Up</Link>
                    </Typography>
                </Grid>

            </Paper>
        </Grid>
    </>);
}