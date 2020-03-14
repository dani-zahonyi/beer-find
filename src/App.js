import React from "react";
import "./styles.css";
import Login from "./scenes/login";
import NavBar from "./components/navbar";
import AppStore, { AppContext } from "./context/AppContext";
export default function App() {
    return (
        <AppStore>
            <NavBar />
            <Login />
        </AppStore>
    );
}
