import alt from '../alt';

import {get} from 'jquery';

import ParserActions from '../actions/ParserActions';

const ParserSource = {
    
    getParsed() {

        return {

            remote(state) {

                return new Promise( (resolve, reject) => {
                        
                        get('http://localhost:3000/parser',{url: encodeURI(state.request)})

                            .done( (data) => {
                                resolve(data);
                            })

                            .fail( () => {   
                                reject('Things have broken');
                            });
                    });
            },

            // here we setup some actions to handle our response
            loading: ParserActions.loadingResults,
            success: ParserActions.receivedResults,
            error: ParserActions.resultsFailed,
        }
    }
};


export default ParserSource;