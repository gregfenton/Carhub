
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { auth } from "../config/firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};