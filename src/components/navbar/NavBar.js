import React, { useContext } from "react";
import "./navBar.css";
import { Logo, UserData } from ".";
import { AppContext } from "../../context/AppContext";

export default props => {
    const { loggedIn } = useContext(AppContext);

    return (
        <nav>
            <Logo />
            <span className="space" />
            {loggedIn && <UserData />}
        </nav>
    );
};
