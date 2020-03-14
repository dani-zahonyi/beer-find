import React, { useState, useEffect } from "react";

import Loader from "../../components/loader";
import { useParams, useHistory } from "react-router-dom";

import "./detailsView.css";
import colors from "../../constants/colors";

const loadBeer = async id => {
    const url = `https://api.punkapi.com/v2/beers/${id}`;
    const data = await fetch(url).then(resp => {
        return resp.json();
    });
    return data;
};

const DetailCard = ({ title, detail }) => {
    return (
        <div className="infoBlock">
            <span className="detailHeader">{title}</span>
            <span className="detailContent">{detail}</span>
        </div>
    );
};

const Details = props => {
    let { id } = useParams();
    const [beer, setBeer] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadBeer(id)
            .then(([data]) => {
                if (data) setBeer(data);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                // setError
            });
    }, [id]);
    const history = useHistory();
    const backButtonHandler = () => history.push("/list");

    if (loading) return <Loader />;
    return (
        <div className="detailsView">
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="title">{beer.name}</span>
                <span className="subTitle">{beer.tagline}</span>
                <button
                    onClick={backButtonHandler}
                    style={{
                        alignSelf: "flex-end",
                        background: colors.beer,
                        color: "black",
                        width: 100
                    }}
                >
                    Back
                </button>
            </div>
            <div className="content">
                <img src={beer.image_url} />
                <div className="details">
                    <DetailCard title="Description" detail={beer.description} />
                    <DetailCard title="AVB" detail={beer.abv + "%"} />
                    <DetailCard title="Brewer's Tips" detail={beer.brewers_tips} />
                    <div className="infoBlock">
                        <span className="detailHeader">Food pairings</span>
                        <span className="detailContent">
                            <ul>
                                {beer.food_pairing.map((food, index) => (
                                    <li key={index}>{food}</li>
                                ))}
                            </ul>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

Details.propTypes = {};

export default Details;
