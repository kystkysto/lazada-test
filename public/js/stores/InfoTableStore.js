import alt from '../alt';

import {get} from 'jquery';

import ParserActions from '../actions/ParserActions';
import ParserSource from '../sources/ParserSource';

class InfoTableStore {

    constructor() {
    
        this.items = [];

        this.errorMessage = null;

        this.bindListeners({
            _handleParsePages: ParserActions.PARSE_PAGES,
            _handleparsePagesSuccess: ParserActions.PARSE_PAGES_SUCCESS,
            _handleResultsFailed: ParserActions.PARSE_PAGES_FAILED,
        });
    }

    _handleParsePages() {
        
        this.items = [];

        this.loading = true;
    }

    _handleparsePagesSuccess(product) {

        this.loading = false;

        this.items.push(product);
    }

    _handleResultsFailed() {
        console.log('faild');
    }

}

export default alt.createStore(InfoTableStore, 'InfoTableStore');