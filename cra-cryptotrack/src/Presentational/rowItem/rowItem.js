import React, { Component } from 'react';

export default class RowItem extends Component {
    render() {
        return (
            <React.Fragment>
                <ul className="rowItem" key={this.props.id}>
                    <li>{this.props.name}</li>
                    <li>{this.props.shortName}</li>
                    <li>$ {this.props.values}</li>
                    <li style={this.props.lastChanges < 0 ? { color: 'red' } : { color: 'green' }}>{this.props.lastChanges}%</li>
                    <form onSubmit={this.props.handleSubmit}>
                        <input
                            type="text"
                            name={this.props.cryptoName}
                            onChange={event => this.props.handleChange(this.props.cryptoSymbols, event)}
                        />
                        <input
                            className="btn-submit"
                            disabled={!this.props.value}
                            type="submit" value="Submit"
                        />
                    </form>
                    <li>{this.props.amount}</li>
                </ul>
            </React.Fragment>
        );
    }
}
