import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const UserData = () => {
    const { username, logout } = useContext(AppContext);
    return (
        <div>
            <span className="welcomeText">Hi, {username}!</span>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default UserData;
