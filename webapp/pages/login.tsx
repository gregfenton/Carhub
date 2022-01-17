import React, { useState, useEffect } from 'react';
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { LockOpenOutlined, LockOutlined } from '@mui/icons-material';
import firebase from 'firebase/compat/app';

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

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [error, setError] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);

    const handlePasswordChange = (e: any) => {
        if (e.target.value.length > 8) {
            setPassword(e?.target?.value)
        }
    }

    const checkPasswordMatch = (e: any) => {
        if (e?.target?.value != password) {
            setError("Passwörter stimmen nicht überein");
            setPasswordValid(false)
        } else {
            setError("");
            setPasswordValid(true)
        }
    }

    const handleEmailChange = (e: any) => {
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const result = regexp.test(e?.target?.value);

        if (result == true) {
            setEmail(e?.target?.value);
        }
    }

    const handleUsernameChange = (e: any) => {
        if (e?.target?.value.length > 3) {
            setUsername(e?.target?.value);
        }
    }

    const signInWithEmailAndPassword = async (email: string, password: string) => {
        const auth = firebase.auth();
        const db = firebase.firestore();
        // check email 

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {

        const auth = firebase.auth();
        const db = firebase.firestore();

        try {
            const res = await auth.createUserWithEmailAndPassword(email, password);
            const user = res.user;
            await db.collection("users").add({
                uid: user?.uid,
                name,
                authProvider: "local",
                email,
            });
        } catch (err) {
            console.error(err);
        }
    };



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
                    <Button type='submit' color='primary' variant="contained" className={classes.button} onClick={() => {
                        signInWithEmailAndPassword()

                    }} fullWidth>Sign in</Button>
                    <Typography >
                        <Link href="#" >
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography > Do you have an account?
                        <Link href="#" style={{ marginLeft: "1vh" }}>Sign Up</Link>
                    </Typography>
                </Grid>

            </Paper>
        </Grid>
    </>);
}