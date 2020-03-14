import React, { useState, useEffect, useContext } from "react";
import Filter from "../../components/filter";
import Loader from "../../components/loader";
import { useListView, BeerListItem } from ".";
import Pagination from "../listView/components/Pagination";

const PAGE_LIMIT = 25;

const BeerListView = props => {
    const {
        handleListItemClick,
        loadBeers,
        currentPage,
        beers,
        loading,
        setCurrentPage
    } = useListView();
    return (
        <div className="scene" style={{}}>
            <Filter onFilter={filters => loadBeers({ filters })}></Filter>
            {loading ? (
                <Loader />
            ) : (
                <div style={{}}>
                    <Pagination
                        hasNext={beers.length === PAGE_LIMIT}
                        currentPage={currentPage}
                        getPage={page => setCurrentPage(page)}
                    />
                    {beers.length ? (
                        beers.map(beer => (
                            <BeerListItem
                                key={beer.id}
                                {...beer}
                                onClick={handleListItemClick}
                            ></BeerListItem>
                        ))
                    ) : (
                        <>
                            <p>No beers for you this time.</p>
                            <p>Try again with different filter values.</p>
                        </>
                    )}
                    <Pagination
                        hasNext={beers.length === PAGE_LIMIT}
                        currentPage={currentPage}
                        getPage={page => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
};

export default BeerListView;
