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
            handleSetUrl: ParserActions.SET_URL,
        });
    }

    handleSetUrl(input) {
        
        const regExp = /^(https?:\/\/www\.lazada\.)((co\.id|com\.my|com\.ph|sg|co.th|vn)\/)(.*)(\.html)$/;

        let index = findIndex(this.inputs, { id: input.id }),
            valid = true;

        this.inputs[index] = input;

        this.inputs.forEach((elem) => {
            
            let inputValid = false;

            if(elem.value.trim() !== '') {
                inputValid = elem.valid = regExp.test(elem.value);
            }

            valid = !!(valid && inputValid);
        });
        
        this.valid = valid;
    }
}

export default alt.createStore(UrlInputsStore, 'UrlInputsStore');