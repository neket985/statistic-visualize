import React from 'react';
import './App.css';
import Table from "./Table";
import matches7 from './matches_7_table.json';
import matches205 from './matches_205_table.json';
import matches672 from './matches_672_table.json';

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
