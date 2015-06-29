import React, { Component } from 'react';

class Header extends Component {

	constructor() {

        super();
    }

    render() {

        return (
            <nav>
                <div className={'container'}>
                    <div className={'nav-wrapper'}>
                        <div className={'row'}>
                            <a href="/"  className={'brand-logo'}>Product Parser</a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

}

export default Header;