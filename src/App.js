import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MatchTable from "./MatchTable";

function App() {

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/:id">
                        <MatchTable/>
                    </Route>
                    <Route path="/">
                        <MatchTable tournament={"7"}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
