
import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import firebase from "firebase/compat/app";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { auth, db } from "../config/firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";

function App() {
    const user = useContext(AuthContext);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const createAccount = async () => {
        let res;
        try {
            res = await auth.createUserWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            );
        } catch (err) {
            console.log(err);
        }

        firebase.auth().onAuthStateChanged(async (user) => {
            console.log(user)
            const userObject = {
                uid: user?.uid,
                authProvider: "local",
                email: user?.email,
            }

            const docRef = await addDoc(collection(db, "user"), userObject);
            console.log("Document written with ID: ", docRef);
        })
    }

    const [loginUser, setLoginUser] = useState({});

    useEffect(() => {
        console.log(loginUser)
    }, [loginUser])

    const signIn = async () => {
        await auth.signInWithEmailAndPassword(
            emailRef.current!.value,
            passwordRef.current!.value
        ).then((userCredential) => {
            if (userCredential.user != null) setLoginUser(userCredential?.user);
        }).catch((error) => {
            setErrorCode(error.code);
            setErrorMessage(error.message);
        })
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

export default App;