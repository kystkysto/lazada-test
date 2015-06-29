import React, { Component } from 'react';

import AltContainer from 'alt/AltContainer';

import UrlInputs from './UrlInputs';
//import InfoTable from './InfoTable';

import UrlInputsStore from '../stores/UrlInputsStore';
import InfoTableStore from '../stores/InfoTableStore';


class Parser extends Component {

	constructor() {

        super();
    }

    render() {

        return (
            <div>
                <h1>Url form</h1>
                <AltContainer store={UrlInputsStore}>
                    <UrlInputs />
                </AltContainer>
            </div>
        );
    }

}

export default Parser;