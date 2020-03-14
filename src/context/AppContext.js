import React from "react";

const Store = ({ children }) => {
    const [username, setUsername] = React.useState("");
    const [loggedIn, setloggedIn] = React.useState(true);
    const [currPage, setCurrentPage] = React.useState(1);

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
                },
                currPage,
                setCurrentPage
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const AppContext = React.createContext();
export default Store;
