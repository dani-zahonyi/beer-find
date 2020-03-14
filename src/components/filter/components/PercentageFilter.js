import React, { useState } from "react";

const PercentageInput = ({ value, min = 0, max = 100, onSetValue }) => {
    const handleChange = e => {
        const newValue = Math.min(Math.max(min, +e.target.value.replace(/[^0-9]/g, "")), max);

        onSetValue(newValue);
    };
    return (
        <>
            <input
                onChange={handleChange}
                value={value}
                style={{ marginLeft: 5, marginRight: 5, width: "2em" }}
            />
            <span style={{ marginRight: 10 }}>%</span>
        </>
    );
};
export default PercentageInput;
