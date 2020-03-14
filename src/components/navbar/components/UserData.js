import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import colors from "../../../constants/colors";

const UserData = () => {
    const { username, logout } = useContext(AppContext);
    return (
        <>
            {" "}
            <span className="welcomeText">Hi, {username}!</span>
            <button onClick={logout} style={{ background: colors.beerDark }}>
                Logout
            </button>
        </>
    );
};

export default UserData;
