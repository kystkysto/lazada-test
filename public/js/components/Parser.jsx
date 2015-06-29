import React, { Component } from 'react';

import AltContainer from 'alt/AltContainer';

import Header from './Header';

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
                <Header />
                <div className={'container'}>
                    <AltContainer store={UrlInputsStore}>
                        <UrlInputs />
                    </AltContainer>
                    <h4>Products table</h4>
                    <AltContainer store={InfoTableStore}>
                        <InfoTable />
                    </AltContainer>
                </div>
            </div>
        );
    }

}

export default Parser;