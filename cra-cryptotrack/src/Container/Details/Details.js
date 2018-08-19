import React, { Component } from 'react';
import LoadingIndicator from '../../Presentational/LoadingIndicator/LoadingIndicator';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './Details.css';

export default class Details extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            quotes: []
        }
    }

    componentWillMount() {

        this.setState({ loading: true });
        const ParameterID = localStorage.getItem('parameterID');
        const apiURL = `https://api.coinmarketcap.com/v2/ticker/${ParameterID}/`;

        fetch(apiURL)
            .then((response) => { return response.json(); })
            .then(data => {

                this.setState({
                    data: data.data,
                    quotes: data.data.quotes['USD'],
                    loading: false,
                })
            })
    }

    render() {
        const { loading } = this.state;
        const loader = (loading ? <LoadingIndicator /> : null);

        const classesCard = {
            maxWidth: '345px',
            margin: 'auto',
            textAlign: 'center',
        }
        const classesCardMedia = {
            paddingTop: '56.25%'
        }

        return (
            <React.Fragment>

                {loader}

                <h2 className="classesDetails"> Details component</h2>

                <Card style={classesCard}>
                    <CardContent>

                        <CardMedia
                            style={classesCardMedia}
                            image="mediaDefault.jpg"
                            title="Crypto currency"
                        />

                        <Typography gutterBottom variant="headline" component="h2">
                            Name: {this.state.data.name}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Rank: {this.state.data.rank}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Circulating supply: {this.state.data.circulating_supply}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Last updated: {this.state.data.last_updated}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Max supply: {this.state.data.max_supply}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Total supply: {this.state.data.total_supply}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Website slug: {this.state.data.website_slug}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Market  cap: {this.state.quotes.market_cap}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Percent change 1h: {this.state.quotes.percent_change_1h} %
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Percent change 7d: {this.state.quotes.percent_change_7d} %
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Percent change 24h: {this.state.quotes.percent_change_24h} %
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Price: {this.state.quotes.price}
                        </Typography>

                        <Typography gutterBottom variant="title" component="p">
                            Volume 24h: {this.state.quotes.volume_24h}
                        </Typography>

                    </CardContent>
                </Card>
            </React.Fragment>

        );
    }
}
