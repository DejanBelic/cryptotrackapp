import React, { Component } from 'react';
import './App.css';
import RowItem from '../../Presentational/rowItem/rowItem';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        const apiURL = ' https://api.coinmarketcap.com/v2/ticker/';
        fetch(apiURL)
            .then((response) => { return response.json(); })
            .then(data => {
                this.setState({
                    data: data.data
                })
                console.log(data.data);
            })

    }

    render() {
        // Filter first 50 top ranked crpyto currencies.
        let topRankedValues = Object.values(this.state.data).filter(function (item) {
            return item.rank <= 50;
        });
        let tableRows = Object.values(topRankedValues).map(row => {
            return (
                <RowItem
                    key={row.id}
                    name={row.name}
                    shortName={row.symbol}
                    values= {parseFloat(row.quotes['USD'].price).toFixed(2)}
                    lastChanges={row.quotes['USD'].percent_change_24h}
                />
            );
        });
        return (
            <React.Fragment>
                <div className="table-wrapper">
                    {tableRows}
                </div>
            </React.Fragment>

        );
    }
}

export default Home;
