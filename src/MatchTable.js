import Table from "./Table";
import matches7 from "./matches_7_table.json";
import matches17 from "./matches_17_table.json";
import React from "react";
import matches205 from './matches_205_table.json';
import matches672 from './matches_672_table.json';
import {useParams} from 'react-router-dom'

function MatchTable(props) {
    let { id } = useParams();
    let matches;
    switch (props.tournament || id) {
        case "7":
            matches = matches7;
            break;
        case "17":
            matches = matches17;
            break;
        case "205":
            matches = matches205;
            break;
        case "672":
            matches = matches672;
            break;
        default:
            matches = matches7;
            break;
    }

    return (
        <div className="App">
            <header className="App-header">

            </header>
            <body>
                <Table matches={matches}/>
            </body>
        </div>
    );
}

export default MatchTable