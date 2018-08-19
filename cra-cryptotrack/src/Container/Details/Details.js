import React, { Component } from 'react';
import LoadingIndicator from '../../Presentational/loadingIndicator/loadingIndicator';


export default class Details extends Component {
    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    componentWillMount() {

        this.setState({ loading: true });
        const ParameterID = localStorage.getItem('parameterID');
        const apiURL = `https://api.coinmarketcap.com/v2/ticker/${ParameterID}/`;
        fetch(apiURL)
            .then((response) => { return response.json(); })
            .then(data => {
                console.log(data.data)
                this.setState({
                    data: data.data,
                    loading: false,
                })
            })
    }

    render() {
        const { loading } = this.state;
        const loader = (loading ? <LoadingIndicator /> : null);

        return (
            <React.Fragment>
                {loader}
                <h2>Details component</h2>
            </React.Fragment>

        );
    }
}