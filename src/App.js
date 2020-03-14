import React from "react";
import "./styles.css";
import Login from "./scenes/login";
import NavBar from "./components/navbar";
import AppStore, { AppContext } from "./context/AppContext";
import Home from "./scenes/home";

const Main = () => {
    return (
        <div>
            <Home />
        </div>
    );
};

export default function App() {
    return (
        <AppStore>
            <NavBar />
            <AppContext.Consumer>
                {({ loggedIn }) => (loggedIn ? <Main /> : <Login />)}
            </AppContext.Consumer>
        </AppStore>
    );
}
