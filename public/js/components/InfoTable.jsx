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

        if(table.thead.names.length) {

            const style = 
            {
                firtCol: {
                    'min-width' : '300px'
                }
            };

            return (
                <div>
                    <table className={'bordered'}>
                        <HeadTable items={table.thead} style={style}/>

                        <tr><td colSpan={table.thead.names.length+1}><h5>Specifications</h5></td></tr>

                        <SpecificationsTable items={table.specifications} style={style}/>

                        <tr><td colSpan={table.thead.names.length+1}><h5>Features</h5></td></tr>
                        
                        <FeaturesTable items={table.features} style={style}/>
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

        let thead = {
            names: [],
            images: [],
            prices: [],
        },
            specifications = [],
            features = [];

        if(items.length) {

            items.forEach((elem) => {

                thead['names'][elem.inputId-1] = elem.product.name;
                thead['images'][elem.inputId-1] = elem.product.img;
                thead['prices'][elem.inputId-1] = elem.product.price;

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
                    <th style={this.props.style.firtCol}><h5>Name</h5></th>
                    { this.props.items.names.map((elem) => {
                        return (
                            <th>
                                <h5>{elem}</h5>
                            </th>
                        );
                    })}
                </tr>
                <tr>
                    <th style={this.props.style.firtCol}></th>
                    { this.props.items.images.map((elem) => {
                        return (
                            <th>
                                <img src={elem} />
                            </th>
                        );
                    })}
                </tr>
                <tr>
                    <th style={this.props.style.firtCol}><h5>Price</h5></th>
                    { this.props.items.prices.map((elem) => {
                        return (
                            <th>
                                <h5>{elem}</h5>
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
                    <td style={this.props.style.firtCol}></td>
                    { this.props.items.map((elem) =>{
                        
                        let list = elem.map((spec) => {
                            return (
                                <li >{spec}</li>
                            );
                        });

                        return (
                            <td >
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
                            <td style={this.props.style.firtCol}>{elem.name}</td>
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