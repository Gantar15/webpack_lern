import SubStr from '@models/SubStr';
import './babel';
import * as $ from 'jquery';

import './styles/styles.css'
import './styles/module.scss'
import json from './assets/json';
import img from './assets/webpack-logo';
import xml from './assets/data.xml';
import csv from './assets/data.csv';

import React, { useEffect } from 'react';
import {render} from 'react-dom';

const strObj = new SubStr(`hello ${img}`);
console.log('json', json);
console.log('xml', xml);
console.log('csv', csv);


const App = () => {
    useEffect(() => {
        $('pre').html(JSON.stringify(json, null, 3));
    }, []);

    return (<div className="container">
        <h1>Webpack</h1>
        <hr/>
        <div className="logo"></div>
        <hr/>
        <pre></pre>
        <div className="scss">
            <span>scss</span>
        </div>
    </div>)
};
render(<App/>, document.getElementById('app'));