import React, { Component } from 'react';

import AltContainer from 'alt/AltContainer';

import UrlInputs from './UrlInputs';
import InfoTable from './InfoTable';

import UrlInputsStore from '../stores/UrlInputsStore';
import InfoTableStore from '../stores/InfoTableStore';


class Parser extends Component {

	constructor() {

        super();
    }

    render() {

        return (
            <div>
                <AltContainer store={UrlInputsStore}>
                    <UrlInputs />
                </AltContainer>
                <h1>Products table</h1>
                <AltContainer store={InfoTableStore}>
                    <InfoTable />
                </AltContainer>
            </div>
        );
    }

}

export default Parser;