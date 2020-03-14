import React, { useMemo, useContext } from "react";
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
    const filtersChanged = useMemo(() => {
        return (
            filterValues.name !== "" ||
            (filterValues.min !== 0 && filterValues.min !== "0") ||
            filterValues.max != 100
        );
    }, [filterValues.name, filterValues.min, filterValues.max]);
    const clearFiltersButtonHandler = () => {
        setFilterValues({ name: "", min: 0, max: 100 });
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
                    value={filterValues.min}
                />
                -
                <PercentageInput
                    min={filterValues.min}
                    onSetValue={max => setFilterValues({ ...filterValues, max })}
                    value={filterValues.max}
                />
            </div>
            <button onClick={filterButtonHandler}>Filter</button>
            <button disabled={!filtersChanged} onClick={clearFiltersButtonHandler}>
                Clear Filters
            </button>
        </div>
    );
};
