import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../hooks/useFirebase';
import "firebase/compat/auth"
import "firebase/compat/app"
import "firebase/compat/firestore"




const authContext = createContext(null);

export function useAuth() {
    return authContext;
}

export function AuthProvider({ children }: { children: any }) {

    const [currentUser, setCurrentUser] = useState(null);


    function signup(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => setCurrentUser(user))

        return unsubscribe
    }, [])

    const value: any = { currentUser, signup }

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider >
    );
}