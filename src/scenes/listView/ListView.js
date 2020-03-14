import React, { useState, useEffect, useContext } from "react";
import Filter from "../../components/filter";
import Loader from "../../components/loader";
import { BeerListItem } from ".";
import Pagination from "../listView/components/Pagination";
import { AppContext } from "../../context/AppContext";
import { useHistory, useLocation } from "react-router-dom";

const PAGE_LIMIT = 25;
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const useBeerList = () => {
    const loadBeers = async ({ filters = {}, page = 1 } = {}) => {
        // keep filters during paging
        const url = "https://api.punkapi.com/v2/beers";
        let queryParams = "?";
        if (filters.name) queryParams += `beer_name=${filters.name}&`;
        if (filters.min) queryParams += `abv_gt=${filters.min}&`;
        if (filters.max) queryParams += `abv_lt=${filters.max}&`;
        if (page) queryParams += `page=${page}`;
        setCurrentPage(page);
        const data = await fetch(url + queryParams).then(resp => {
            return resp.json();
        });
        setBeers(data);
        setLoading(false);
    };
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currPage, setCurrentPage } = useContext(AppContext);
    useEffect(() => {
        loadBeers({ page: currPage });
    }, []);

    const history = useHistory();
    const handleListItemClick = id => {
        history.push(`/details/${id}`);
    };

    return {
        handleListItemClick,
        loadBeers,
        currPage,
        beers,
        loading
    };
};

const BeerListView = props => {
    const { handleListItemClick, loadBeers, currPage, beers, loading } = useBeerList();
    return (
        <div className="scene" style={{}}>
            <Filter onFilter={filters => loadBeers({ filters })}></Filter>
            {loading ? (
                <Loader />
            ) : (
                <div style={{}}>
                    <Pagination
                        hasNext={beers.length === PAGE_LIMIT}
                        currPage={currPage}
                        getPage={page => loadBeers({ page })}
                    />
                    {beers.map(beer => (
                        <BeerListItem
                            key={beer.id}
                            {...beer}
                            onClick={handleListItemClick}
                        ></BeerListItem>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BeerListView;
