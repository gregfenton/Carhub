import React from "react";
import ReactDOM from "react-dom";
import Login from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../provider/AuthProvider";

if (typeof window !== 'undefined') {
    ReactDOM.render(
        <React.StrictMode>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </React.StrictMode>,
        document.getElementById("root")
    );
}