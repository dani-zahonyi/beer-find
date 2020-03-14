import React from "react";
import { useHistory } from "react-router-dom";
const Store = ({ children }) => {
    const [username, setUsername] = React.useState("");
    const [loggedIn, setloggedIn] = React.useState(true);
    const [currPage, setCurrentPage] = React.useState(1);
    const history = useHistory();

    return (
        <AppContext.Provider
            value={{
                username,
                loggedIn,
                login: username => {
                    setloggedIn(true);
                    setUsername(username);
                    history.push("/list");
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
