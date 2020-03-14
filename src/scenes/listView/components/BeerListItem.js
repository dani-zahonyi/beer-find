import React, { useState } from "react";

import "./beerListItem.css";

const BeerListItem = ({ id, name, image_url, abv, tagline, onClick }) => {
    const [over, setOver] = useState(false);
    return (
        <div
            className={"beerListItem"}
            onMouseEnter={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            onClick={() => onClick(id)}
        >
            {over && <div className="beerListItem-mask"></div>}
            <img src={image_url} alt={tagline} />
            <div>
                <p>{name}</p>
                <p> {abv}%</p>
            </div>
        </div>
    );
};

export default BeerListItem;
