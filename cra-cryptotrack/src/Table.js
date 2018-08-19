import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Details from './Container/Details/Details';
import Home from './Container/Home/Home';

export default class Table extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/:id" component={Details} />
                </div>
            </BrowserRouter>
        );
    }
}