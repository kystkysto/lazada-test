import React, { Component } from 'react';

import AltContainer from 'alt/AltContainer';

import {isArray, findIndex} from 'underscore';

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
                    <table>
                        <HeadTable items={table.thead} />

                        <tr colspan={table.thead.length+1}><td>Specifications</td></tr>

                        <SpecificationsTable items={table.specifications} />

                        <tr colspan={table.thead.length+1}><td>Features</td></tr>
                        
                        <FeaturesTable items={table.features} />
                    </table>
                </div>
            );
        } else {
            return (
                
                <h4>Please enter url to start comparision!</h4>
            );
        }
    }

    _convert(items) {

        let thead = [],
            specifications = [],
            features = [];

        if(items.length) {

            items.forEach((elem) => {

                thead[elem.inputId] = {
                    name: elem.product.name,
                    img: elem.product.img,
                    price: elem.product.price
                };

                elem.product.features.forEach((feature, index) => {
                    
                    let id = findIndex(features, {name: feature.name}),
                        tmp = [];


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

                specifications[elem.inputId] = elem.product.specifications;
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
                                <h2>{elem.name}</h2>
                                <img src={elem.img} />
                                <h3>{elem.price}</h3>
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
                                <li>{spec}</li>
                            );
                        });

                        return (
                            <td>
                                <ul>{list}</ul>
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
                            {elem.features.map((feature) => {
                                return (
                                    <td>{feature}</td>
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