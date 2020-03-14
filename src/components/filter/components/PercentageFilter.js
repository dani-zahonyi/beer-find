import React, { useState } from "react";

const PercentageInput = ({ initValue, min = 0, max = 100, onSetValue }) => {
    const [percentage, setPercentage] = useState(initValue);
    const handleChange = e => {
        const newValue = Math.min(Math.max(min, +e.target.value.replace(/[^0-9]/g, "")), max);
        setPercentage(newValue);
        onSetValue(newValue);
    };
    return (
        <>
            <input
                onChange={handleChange}
                value={percentage}
                style={{ marginLeft: 5, marginRight: 5, width: "2em" }}
            />
            <span style={{ marginRight: 10 }}>%</span>
        </>
    );
};
export default PercentageInput;
