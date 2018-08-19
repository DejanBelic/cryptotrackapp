import React, { Component } from 'react';
import './Home.css';
import RowItem from '../../Presentational/rowItem/rowItem';
import LoadingIndicator from '../../Presentational/loadingIndicator/loadingIndicator';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            inputDisabled: true,
            values: {},
            defaultValue: {}
        }
    }

    fetchInitialDataHandler = () => {
        // Set state to loading true which will trigger loading indicator.
        this.setState({ loading: true });

        const apiURL = ' https://api.coinmarketcap.com/v2/ticker/';
        fetch(apiURL)
            .then((response) => { return response.json(); })
            .then(data => {
                this.setState({
                    data: data.data,
                    loading: false,
                })
            })
    }

    /*
    * Function to populate input values. Load saved currencies from localStorage and check if input name and key matches, if so set input value.
    */
    populateInputsHandler = () => {
        const currencies = localStorage.getItem("currencies");

        if (currencies == null) return;

        const inputParse = JSON.parse(currencies);
        // Get Node collection of inputs.
        const inputsAvailable = document.querySelectorAll('input[name]');
        // Get Node collection of list elements.
        const calculatedAmountElements = document.querySelectorAll('li[name]');
        // Convert Node collection to array.
        const listElements = [...calculatedAmountElements];
        const InputElements = [...inputsAvailable];

        // Object of same key-value pairs from inputs.
        for (let [key, value] of Object.entries(inputParse)) {
            InputElements.map(inputElement => {
                if (inputElement.name === key) {
                    inputElement.value = value;
                }
                return InputElements;
            });
            listElements.map(listElement => {
                if (listElement.outerHTML.includes(key)) {
                    listElement.textContent = value;
                }
                return listElements;
            });
        }
    }

    /*
    * Function for handling submit. Set all input values to localStorage.
    */
    handleSubmit = (event) => {
        event.preventDefault();
        let availableCurrencies = JSON.stringify(this.state.values);
        window.localStorage.setItem('currencies', availableCurrencies);
    }

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
            }
        })
    };

    componentDidUpdate() {
        this.populateInputsHandler();
    }

    componentWillMount() {
        this.fetchInitialDataHandler();
        // Fetch data on every 60 seconds.
        setInterval(this.fetchInitialDataHandler, 60000);
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
                    cryptoSymbols={row.symbol}
                    cryptoName={row.symbol}
                    values={parseFloat(row.quotes['USD'].price).toFixed(4)}
                    value={this.state.values[row.symbol]}
                    lastChanges={row.quotes['USD'].percent_change_24h}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    disabled={this.state.inputDisabled}
                    amount={parseFloat(row.quotes['USD'].price).toFixed(2) * this.state.values}
                />
            );
        });
        return (
            <React.Fragment>
                {loader}
                <div className="table-wrapper">
                    {tableRows}
                </div>
            </React.Fragment>

        );
    }
}

export default Home;
