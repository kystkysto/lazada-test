import React from 'react'
import Parser from './components/Parser'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

React.render(
    <Parser />,
    document.getElementById('parserApp')
)