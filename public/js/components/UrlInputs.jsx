import React, { Component } from 'react';

import ParserActions from '../actions/ParserActions';

class UrlInputs extends Component {

    constructor() {

        super();
    }

    _onSubmit(event) {

        event.preventDefault();
        
        if(this.props.valid) {
            ParserActions.parsePages(this.props.inputs);
        }

    }

    render() {

        return (
            <form onSubmit={this._onSubmit.bind(this)}>
                {this.props.inputs.map((input, i) => {
                    return (
                        <UrlInput value={input.value}
                            id={input.id}
                            valid={input.valid}/>
                    );
                })}

                <input type="submit" disabled={!this.props.valid} value="Parse"/>
            </form>
        );
    }

}

class UrlInput extends Component {

	constructor() {

        super();
    }

    _onChange(event) {
        
        let input = {
            id: Number(event.target.getAttribute('data-id')),
            value: event.target.value
        };
        
        ParserActions.setUrl(input);
    }

    render() {

        let value = this.props.value,
            errorMsg = this.props.valid ? '' : <span>Url is not valid</span>;

        return (
            <div>
                <label for={'url_' + this.props.id}></label>
                <input type="text"
                    value={value}
                    id={'url_' + this.props.id}
                    data-id={this.props.id}
                    onChange={this._onChange}
                    placeholder="Please enter item url"/>
                {errorMsg}
            </div>
        );
    }

}

export default UrlInputs;