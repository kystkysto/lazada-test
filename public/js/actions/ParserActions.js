import alt from '../alt';

class ParserActions {

    setUrl(input) {
    
        this.dispatch(input);
    }

    getPages(inputs) {

        this.dispatch(inputs);
    }

    loadingResults() {
    	this.dispatch();
    }

    receivedResults(result) {
		this.dispatch(result);
    }

    resultsFailed(errorMessage) {
		this.dispatch(errorMessage);
    }
}

export default alt.createActions(ParserActions);