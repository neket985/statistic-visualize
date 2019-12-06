import React from 'react';
import './App.css';
import Table from "./Table";
import matches7 from './matches_7_all.json';

function App() {

    return (
        <div className="App">
            <header className="App-header">

            </header>
            <body>
                <Table matches={matches7}></Table>
            </body>
        </div>
    );
}

export default App;
