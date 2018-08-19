import React, { Component } from 'react';
import './Home.css';
import RowItem from '../../Presentational/RowItem/RowItem';
import LoadingIndicator from '../../Presentational/LoadingIndicator/LoadingIndicator';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            inputDisabled: true,
            values: {},
            defaultValue: {}
        };
    }

    fetchInitialDataHandler = () => {
        // Set state to loading true which will trigger loading indicator.
        this.setState({ loading: true });

        const apiURL = " https://api.coinmarketcap.com/v2/ticker/";
        fetch(apiURL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    data: data.data,
                    loading: false
                });
            });
    };

    /*
    * Function to populate input values and available currency.
    */
    loadFromLocalStorage = () => {
        const currencies = localStorage.getItem("currencies");

        if (currencies == null) return;
        // Get all data from localStorage, and set it as component data.
        this.setState({
            values: JSON.parse(currencies)
        });
    };

    /*
    * Function for handling submit. Set all input values to localStorage.
    */
    handleSubmit = (event) => {
        event.preventDefault();
        let availableCurrencies = JSON.stringify(this.state.values);
        window.localStorage.setItem("currencies", availableCurrencies);
    };

    /*
    * Function for handling inputs, and disabling submits.
    */
    handleChange = (symbol, number, amount, name) => {
        this.setState(prevState => {
            return {
                values: {
                    ...prevState.values,
                    [symbol]: number,
                    [amount]: name
                }
            };
        });
    };
    /*
     * Function used to store clicked element ID which will be used as parameter to make api call.
     */
    linkHandler = (event) => {
        localStorage.setItem("parameterID", event.target.id);
    };

    componentDidMount() {
        this.fetchInitialDataHandler();
        // Fetch data on every 60 seconds.
        this.interval = setInterval(this.fetchInitialDataHandler, 60000);
        this.loadFromLocalStorage();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { loading } = this.state;
        const loader = (loading ? <LoadingIndicator /> : null);


        // Filter first 50 top ranked crypto currencies.
        let topRankedValues = Object.values(this.state.data).filter(function (item) {
            return item.rank <= 50;
        });

        let tableRows = Object.values(topRankedValues).map(row => {
            return (
                <RowItem
                    key={row.id}
                    shortName={row.symbol}
                    name={row.name}
                    id={row.id}
                    linkHandler={this.linkHandler}
                    cryptoSymbols={row.symbol}
                    cryptoName={row.symbol}
                    values={parseFloat(row.quotes["USD"].price).toFixed(4)}
                    value={this.state.values[row.symbol]}
                    lastChanges={row.quotes["USD"].percent_change_24h}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    disabled={this.state.inputDisabled}
                    amount={
                        parseFloat(row.quotes["USD"].price).toFixed(2) * this.state.values
                    }
                />
            );
        });
        return (
            <React.Fragment>
                {loader}
                <div className="table-wrapper">
                    <div className="heading-wrapper">
                        <div className="heading-item ">Name</div>
                        <div className="heading-item ">Short name</div>
                        <div className="heading-item ">$ value</div>
                        <div className="heading-item ">last 24h</div>
                        <div className="heading-item ">Amount you own</div>
                        <div className="heading-item ">$ Value of your coin</div>
                    </div>
                    {tableRows}
                </div>
            </React.Fragment>
        );
    }
}
