import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import firebase from "firebase/compat/app";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { auth, db } from "../config/firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";
import "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import "firebase/compat/auth";

import "firebase/app";
import "firebase/firestore";
import "firebase/functions";
import "firebase/auth";

export default function App() {
    // I'm not clear what the purpose of this AuthContext is?
    const user = useContext(AuthContext);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loginUser, setLoginUser] = useState(null);
    const [isFirstLogin, setIsFirstLogin] = useState(null);

    // listen for changes to auth state.  On sign out, `user` will be null.
    useEffect(() => {
        let stopListenerFn = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                setLoginUser(user);
            });

        return stopListenerFn;
    }, []);

    // testing :)
    useEffect(() => {
        console.log("This component is being mounted!!!");
    
        return () => { console.log("Unmounting now!"); }
      }, []);

    // if this is their first time logging in, create a profile doc
    useEffect(() => {
        const createFirstTimeDoc = async (loginUser) => {
            const userObject = {
                uid: loginUser.uid,
                authProvider: "local",
                email: loginUser.email,
            };

            try {
                const docRef = await addDoc(collection(db, "user"), userObject);
                console.log("Document written with ID: ", docRef);
                setIsFirstLogin(false);
            } catch(ex) {
                console.log(`FIRST TIME got an exception: ${ex.message}`);
            }
        }
        if (loginUser && isFirstLogin) {
            createFirstTimeDoc(loginUser);
        }
    }, [loginUser, isFirstLogin]);

    const createAccount = async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            );

            setIsFirstLogin(true);
        } catch (err) {
            console.log(err);
        }
    };

    const signIn = async () => {
        try {
            let userCredential = await auth.signInWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            );

            if (userCredential?.user) {
                setLoginUser(userCredential.user);
                setIsFirstLogin(false);
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    const signOut = async () => {
        await auth.signOut();
    };

    return (
        <>
            <Navbar className="justify-content-between" bg="dark" variant="dark">
                <Navbar.Brand>Firebase Authentication</Navbar.Brand>
                {user && <Button onClick={signOut}>Sign Out</Button>}
            </Navbar>
            {!user ? (
                <Container style={{ maxWidth: "500px" }} fluid>
                    <Form className="mt-4">
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="email" />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                ref={passwordRef}
                                type="password"
                                placeholder="password"
                            />
                        </Form.Group>
                        <Row>
                            <Col xs={6}>
                                <Button onClick={createAccount} type="button">
                                    Sign Up
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <Button
                                    onClick={signIn}
                                    type="button"
                                    variant="secondary"
                                >
                                    Sign In
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            ) : (
                <h2 className="mt-4 text-center">Welcome {user.email}</h2>
            )}
        </>
    );
}