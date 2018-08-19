import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class RowItem extends Component {
    render() {
        return (
            <React.Fragment>
                <ul className="rowItem">
                    <li>
                        {this.props.name}
                    </li>
                    <li>
                        <Link id={this.props.id}
                            to={this.props.shortName}
                            onClick={this.props.linkHandler}
                        >
                            {this.props.shortName}
                        </Link>
                    </li>
                    <li>$ {this.props.values}</li>
                    <li
                        style={this.props.lastChanges < 0 ? { color: 'red' } : { color: 'green' }}>{this.props.lastChanges}%
                        </li>

                    <form onSubmit={this.props.handleSubmit}>
                        <input
                            type="text"
                            name={this.props.cryptoName}
                            value={this.props.value || ''}
                            onChange={this.handleChange}
                        />
                        <input
                            className="btn-submit"
                            disabled={!this.props.value}
                            type="submit" value="Submit"
                        />
                    </form>
                    <li name={this.props.name}>{(this.props.values * (this.props.value || 0.0)).toFixed(2)} $</li>
                </ul>
            </React.Fragment>
        );
    }

    handleChange = event => {
        const regExp = /^[0-9\b]+$/;
        const text = event.target.value;
        if (text === "" || regExp.test(text)) {
            const number = parseFloat(text);
            this.props.handleChange(
                this.props.cryptoName,
                number,
                this.props.name,
                (this.props.values * (this.props.value || 0.0)).toFixed(2)
            );
        }
    };
}
