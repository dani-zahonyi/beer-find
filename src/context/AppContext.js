import React from "react";

const Store = ({ children }) => {
    const [username, setUsername] = React.useState("");
    const [loggedIn, setloggedIn] = React.useState();

    return (
        <AppContext.Provider
            value={{
                username,
                loggedIn,
                login: username => {
                    setloggedIn(true);
                    setUsername(username);
                },
                logout: () => {
                    setloggedIn(false);
                    setUsername("");
                }
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const AppContext = React.createContext();
export default Store;
