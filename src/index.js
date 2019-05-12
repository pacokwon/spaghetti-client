import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './components/app/App';
import Login from './components/login/Login.jsx';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const routing = (
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route exact path="/login" component={Login} />
        </div>
    </Router>
)

document.body.style.paddingTop = '30px';
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
