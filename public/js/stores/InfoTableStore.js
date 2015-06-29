import alt from '../alt';

import {get} from 'jquery';

import ParserActions from '../actions/ParserActions';
import ParserSource from '../sources/ParserSource';

class InfoTableStore {

    constructor() {
    
        this.itmes = [];

        this.errorMessage = null;

        this.bindListeners({
            handleParsePages: ParserActions.GET_PAGES,
            handleLoadingResults: ParserActions.LOADING_RESULTS,
            handleReceivedResults: ParserActions.RECEIVED_RESULTS,
            handleResultsFailed: ParserActions.RESULTS_FAILED,
        });

        this.registerAsync(ParserSource);
    }

    handleLoadingResults() {
        this.itmes = [];
    }

    handleReceivedResults(item) {
        this.itmes.push(item);
    }

    handleResultsFailed(error) {
        console.log(error);
    }

    handleParsePages(inputs) {
        
        inputs.forEach((input) => {

            let self = this;
            self.request = input.value;
            
            ParserSource.getParsed().remote(this).then((data) => self.items.push(data));
        });
    }
}

export default alt.createStore(InfoTableStore, 'InfoTableStore');