import React, { useState } from "react";
import PercentageInput from "./components/PercentageFilter";
import "./filter.css";
export default () => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);
    const [name, setName] = useState();
    const handleChange = e => setName(e.target.value);
    return (
        <div className="filterBar">
            <div className="nameFilter">
                <label>Name</label>
                <input placeholder="name" onChange={handleChange} value={name} />
            </div>
            <div className="space"></div>
            <div className="ABVFilter">
                <PercentageInput max={max} onSetValue={setMin} initValue={0} />
                -
                <PercentageInput min={min} onSetValue={setMax} initValue={100} />
            </div>
            <button>Filter</button>
        </div>
    );
};
