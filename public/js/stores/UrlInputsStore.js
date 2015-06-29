import alt from '../alt';
import {findIndex} from 'underscore';

import ParserActions from '../actions/ParserActions';

class UrlInputsStore {

    constructor() {
    
        this.inputs = [
            { id: 1, value: '', valid: true},
            { id: 2, value: '', valid: true}
        ];

        this.valid = false;

        this.errorMessage = null;

        this.bindListeners({
            _handleSetUrl: ParserActions.SET_URL,
        });
    }

    _handleSetUrl(input) {

        let index = findIndex(this.inputs, { id: input.id });

        this.inputs[index] = input;

        this._isValid(input.value)
    }

    _isValid(value) {

        const regExp = /^(https?:\/\/www\.lazada\.)((co\.id|com\.my|com\.ph|sg|co.th|vn)\/)(.*)(\.html)$/;

        let valid = true;

        this.inputs.forEach( (elem) => {
            
            let inputValid = false,
                url = elem.value.trim();

            if(url !== '') {
                inputValid = elem.valid = regExp.test(url);
            }

            valid = !!(valid && inputValid);
        });
        
        this.valid = valid;
    }
}

export default alt.createStore(UrlInputsStore, 'UrlInputsStore');