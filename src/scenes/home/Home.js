import React, { useState, useEffect, useContext } from "react";
import Filter from "../../components/filter";
import Loader from "../../components/loader";
import { BeerListItem } from ".";
import Pagination from "./components/Pagination";
import { AppContext } from "../../context/AppContext";
const Home = props => {
    const loadBeers = async ({ filters = {}, page = 1 } = {}) => {
        const url = "https://api.punkapi.com/v2/beers";
        let queryParams = "?";
        if (filters.name) queryParams += `name=${filters.name}&`;
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
    useEffect(() => {
        loadBeers();
    }, []);

    const { currPage, setCurrentPage } = useContext(AppContext);

    return (
        <div className="scene" style={{}}>
            <Filter></Filter>
            {loading ? (
                <Loader />
            ) : (
                <div style={{}}>
                    <Pagination currPage={currPage} getPage={page => loadBeers({ page })} />
                    {beers.map(beer => (
                        <BeerListItem key={beer.id} {...beer}></BeerListItem>
                    ))}
                    <div>pager</div>
                </div>
            )}
        </div>
    );
};

export default Home;
