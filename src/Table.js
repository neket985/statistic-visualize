import React from "react";
import Select from "react-select";
import ReactJson from 'react-json-view'

class Table extends React.Component {
    constructor(props) {
        super(props);
        let seasons = this.props.matches;
        let tournamentName = seasons[0].name.replace(seasons[0].year, "").trim();

        let headers = Array.of(
            <th></th>,
            <th>summary</th>,
            <th>timeline</th>,
            <th>probabilities</th>,
            <th>lineups</th>
        );

        let coverages = Array.from(new Set(seasons.flatMap((e) => {
            return Object.keys(e.fields)
        }))).map((e) => {
            return {value: e, label: e}
        });
        let firstCoverage = coverages[0];

        let value = this.calculateValues(firstCoverage);
        this.state = {
            name: tournamentName,
            headers: headers,
            coverages: coverages,
            coverage: firstCoverage,
            value: value
        };
    }

    allowedJsonNames = Array.of(
        "statistics",
        "timeline",
        "probabilities"
    );
    prettyJson = (json) => {
        return <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            src={json}
            shouldCollapse={(e) => {
                return e.name !== "root" && !this.containsOne(this.allowedJsonNames, e.namespace)
            }}/>
    };

    containsOne = (inner, outer) => {
        let contains = false;
        for (let e of inner) {
            let index = outer.indexOf(e);

            if (index !== -1 && outer.length - index <= 1) { //раскрывать скобки на n уровней вглубь
                contains = true;
                break;
            }
        }
        return contains
    };

    calculateValues = (coverage) => {
        let seasons = this.props.matches;

        let value = seasons.map((season) => {
            let coveragedFields = season.fields[coverage.value];
            if (coveragedFields) {
                return <tr key={season.id}>
                    {Array.of(
                        <td key={1}>{season.year}</td>,
                        <td key={2}>{this.prettyJson(coveragedFields.summary)}</td>,
                        <td key={3}>{this.prettyJson(coveragedFields.timeline)}</td>,
                        <td key={4}>{this.prettyJson(coveragedFields.probabilities)}</td>,
                        <td key={5}>{this.prettyJson(coveragedFields.lineups)}</td>
                    )}
                </tr>
            } else return <tr key={season.id}>
                {Array.of(
                    <td key={1}>{season.year}</td>,
                    <td key={2}></td>,
                    <td key={3}></td>,
                    <td key={4}></td>,
                    <td key={5}></td>
                )}
            </tr>
        });
        this.setState({value: value});

        return value;
    };

    handleChangeSelect = selectedOption => {
        this.setState({coverage: selectedOption});
        this.calculateValues(selectedOption)
    };

    render() {
        return <div>
            <Select
                value={this.state.coverage}
                onChange={this.handleChangeSelect}
                options={this.state.coverages}
            />
            <div className="flex-center">
                <div className="title">{this.state.name}</div>
                <table>
                    <thead>
                    <tr>
                        {this.state.headers}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.value}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default Table