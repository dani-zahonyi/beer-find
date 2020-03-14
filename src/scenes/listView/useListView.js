import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ErrorContext } from "../../context/ErrorContext";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default () => {
    const { showError } = useContext(ErrorContext);

    const query = useQuery();
    const [min, max, name, page] = [
        query.get("min"),
        query.get("max"),
        query.get("name"),
        query.get("page")
    ];
    const loadBeers = async () => {
        // keep filters during paging

        const url = "https://api.punkapi.com/v2/beers";
        let queryParams = "?";
        if (name) queryParams += `beer_name=${name}&`;
        if (min) queryParams += `abv_gt=${min}&`;
        if (max) queryParams += `abv_lt=${max}&`;
        if (page) queryParams += `page=${page}`;
        const data = await fetch(url + queryParams).then(resp => {
            return resp.json();
        });
        setBeers(data);
        setLoading(false);
    };
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadBeers().catch(() => {
            showError(
                "Something wrong with to API, maybe your, please check your internet connection!"
            );
        });
    }, [min, max, name, page]);

    const { currentPage, setCurrentPage } = useContext(AppContext);
    const history = useHistory();
    const handleListItemClick = id => {
        history.push(`/details/${id}`);
    };

    return {
        handleListItemClick,
        loadBeers,
        currentPage,
        beers,
        loading,
        setCurrentPage
    };
};
