import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20,
        height: "100%",
        width: "60%",
        margin: "0 auto !important",
        maxWidth: "500px",
        maxheight: "500px",
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

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [repPassword, setRepPassword] = useState(null);

    const { signup } = useAuth();

    async function handleSubmit(e: any) {

        e.preventDefault();

        if (password !== repPassword) {
            return setError("Passwords do not match");
        }

        try {
            if (email != null && password != null) {
                setLoading(true);
                setError("");
                await signup(email, password);
            }
        } catch (err) {
            setError("Failed to create a account")
        }
        setLoading(false);

    }

    return (<>
        <Grid>
            <Paper elevation={10} className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center">
                        <h2>Sign in</h2>
                        <Avatar className={classes.avatar}><LockOutlined /></Avatar>
                        <TextField label="Email adress" placeholder="Email adress" fullWidth onBlur={(e) => { setEmail(e?.target?.value) }} required variant="standard" ></TextField>
                        <TextField label="Password" placeholder="Password" required fullWidth onBlur={(e) => setPassword(e?.target?.value)} variant="standard" type="password" ></TextField>
                        <TextField label="Repeat password" placeholder="Repeat password" required fullWidth onBlur={(e) => { setRepPassword(e?.target?.value) }} type="password" variant="standard" ></TextField>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button disabled={loading} type='submit' color='primary' variant="contained" className={classes.button} onClick={async () => {

                        }} fullWidth>Sign in</Button>
                        <Typography >
                            <Link href="#" >
                                Forgot password?
                            </Link>
                        </Typography>
                        <Typography > Do you have an account?
                            <Link href="/" style={{ marginLeft: "1vh" }}>Sign In</Link>
                        </Typography>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    </>);
}