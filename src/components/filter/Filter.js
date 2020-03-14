import React, { useState, useContext } from "react";
import PercentageInput from "./components/PercentageFilter";
import "./filter.css";
import { AppContext } from "../../context/AppContext";
export default () => {
    const { filterValues, setFilterValues, reloadBeers, setCurrentPage, currentPage } = useContext(
        AppContext
    );

    const handleChange = e => setFilterValues({ ...filterValues, name: e.target.value });
    const filterButtonHandler = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        } else {
            reloadBeers();
        }
    };

    return (
        <div
            className="filterBar"
            onKeyPress={event => {
                if (event.key === "Enter") {
                    filterButtonHandler();
                }
            }}
        >
            <div className="nameFilter">
                <label>Name</label>
                <input placeholder="name" onChange={handleChange} value={filterValues.name} />
            </div>
            <div className="space"></div>
            <div className="ABVFilter">
                <PercentageInput
                    max={filterValues.max}
                    onSetValue={min => setFilterValues({ ...filterValues, min })}
                    initValue={filterValues.min}
                />
                -
                <PercentageInput
                    min={filterValues.min}
                    onSetValue={max => setFilterValues({ ...filterValues, max })}
                    initValue={filterValues.max}
                />
            </div>
            <button onClick={filterButtonHandler}>Filter</button>
        </div>
    );
};
