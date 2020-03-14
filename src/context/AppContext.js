import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Store = ({ children }) => {
    const [username, setUsername] = React.useState("");
    const [loggedIn, setloggedIn] = React.useState(true);

    // TODO handle invalid queryParams
    const query = useQuery();
    const history = useHistory();
    const [filterValues, setFilterValues] = React.useState({
        min: query.get("min") || 0,
        max: query.get("max") || 100,
        name: query.get("name") || ""
    });
    const [currentPage, setCurrentPage] = React.useState(
        query.get("page") ? parseInt(query.get("page")) : 1
    );

    const reloadBeers = () => {
        let queryParams = "?";
        if (filterValues.name) queryParams += `name=${filterValues.name}&`;
        if (filterValues.min) queryParams += `min=${filterValues.min}&`;
        if (filterValues.max) queryParams += `max=${filterValues.max}&`;
        if (currentPage && currentPage !== 1) queryParams += `page=${currentPage}&`;
        history.push("/list" + queryParams.substring(0, queryParams.length - 1));
    };

    const location = useLocation();

    const login = username => {
        setloggedIn(true);
        setUsername(username);
        if (!location.pathname.includes("list")) history.push("/list");
    };
    useEffect(() => {
        if (location.pathname.includes("list")) reloadBeers();
    }, [currentPage]);

    return (
        <AppContext.Provider
            value={{
                username,
                loggedIn,
                login,
                reloadBeers,
                logout: () => {
                    setloggedIn(false);
                    setUsername("");
                },
                currentPage,
                setCurrentPage,
                filterValues,
                setFilterValues
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const AppContext = React.createContext();
export default Store;
