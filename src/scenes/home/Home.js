import React from "react";
import ListView from "../listView";
import Details from "../details";

import { Switch, Route } from "react-router-dom";
const Home = () => {
    return (
        <div className="sceneWrapper">
            <Switch>
                <Route path="/list">
                    <ListView />
                </Route>
                <Route path="/details/:id">
                    <Details />
                </Route>
            </Switch>
        </div>
    );
};

export default Home;
