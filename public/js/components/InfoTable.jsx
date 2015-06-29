import React, { Component } from 'react';

import AltContainer from 'alt/AltContainer';

import {isArray, findIndex, map} from 'underscore';

import ParserActions from '../actions/ParserActions';
import InfoTableStore from '../stores/InfoTableStore';

class InfoTable extends Component {

    constructor() {

        super();
    }

    render() {

        let table = this._convert(this.props.items);

        if(table.thead.length) {

            return (
                <div>
                    <table className={'bordered'}>
                        <HeadTable items={table.thead} />

                        <tr><td colSpan={table.thead.length+1}><h5>Specifications</h5></td></tr>

                        <SpecificationsTable items={table.specifications} />

                        <tr><td colSpan={table.thead.length+1}><h5>Features</h5></td></tr>
                        
                        <FeaturesTable items={table.features} />
                    </table>
                </div>
            );
        } else {

            if(this.props.loading) {
                return (
                    <div className={'valign-wrapper'}>
                        <div className={'preloader-wrapper big active'}>
                            <div className={'spinner-layer spinner-blue-only'}>

                                <div className={'circle-clipper left'}>
                                    <div className={'circle'}></div>
                                </div>

                                <div className={'gap-patch'}>
                                    <div className={'circle'}></div>
                                </div>
                                
                                <div className={'circle-clipper right'}>
                                    <div className={'circle'}></div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            return (

                <h5>Please enter urls to start comparision!</h5>
            );
        }
    }

    _convert(items) {

        let thead = [],
            specifications = [],
            features = [];

        if(items.length) {

            items.forEach((elem) => {

                thead[elem.inputId-1] = {
                    name: elem.product.name,
                    img: elem.product.img,
                    price: elem.product.price
                };

                elem.product.features.forEach((feature, index) => {
                    
                    let id = findIndex(features, {name: feature.name}),
                        tmp = [];

                    for(let i in items) {
                        tmp.push('');
                    }

                    tmp[elem.inputId-1] = feature.value;

                    if(id === -1) {
                        features.push(
                            {
                                name: feature.name,
                                features: tmp
                            }
                        );
                    } else {
                        features[id].features[elem.inputId-1] = feature.value;
                    }
                });

                specifications[elem.inputId-1] = elem.product.specifications;
            });
        }

        return {

            thead: thead,
            specifications: specifications,
            features: features
        };
    }

}

class HeadTable extends Component {

    constructor() {

        super();
    }

    render() {


        return (
            <tbody>
                <tr>
                    <th></th>
                    { this.props.items.map((elem) => {
                        return (
                            <th>
                                <h5>{elem.name}</h5>
                                <img src={elem.img} />
                                <h6>{elem.price}</h6>
                            </th>
                        );
                    })}
                </tr>
            </tbody>
        );
    }
}

class SpecificationsTable extends Component {

    constructor() {

        super();
    }

    render() {

        return (
            <tbody>
                <tr>
                    <td></td>
                    { this.props.items.map((elem) =>{
                        
                        let list = elem.map((spec) => {
                            return (
                                <li >{spec}</li>
                            );
                        });

                        return (
                            <td>
                                <ul >{list}</ul>
                            </td>
                        );
                    })}
                </tr>
            </tbody>
        );
    }
}

class FeaturesTable extends Component {

    constructor() {

        super();
    }

    render() {
        
        return (
            <tbody>
                { this.props.items.map((elem) => {
                    return (
                        <tr>
                            <td>{elem.name}</td>
                            {
                                elem.features.map((feature) => {
                                return (
                                    <td >{feature}</td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    }
}


export default InfoTable;