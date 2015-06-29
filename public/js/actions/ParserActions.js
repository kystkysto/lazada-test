import alt from '../alt';
import {get} from 'jquery';

class ParserActions {

    setUrl(input) {
    
        this.dispatch(input);
    }

    parsePages(inputs) {

        inputs.forEach( (input) => {
            get('http://localhost:3000/parser',{
                url: encodeURI(input.value)
            })

                .done( (data) => {

                    this.actions.parsePagesSuccess({
                        product: data,
                        inputId: input.id
                    });
                }.bind(this))

                .fail( () => {

                    this.actions.parsePagesFailed();
                }.bind(this));
        });

        this.dispatch();
    }

    parsePagesSuccess(result) {

        this.dispatch(result);
    }

    parsePagesFailed() {

        this.dispatch();
    }
}

export default alt.createActions(ParserActions);