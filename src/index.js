import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/app/App.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


const routing = (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
        </Switch>
    </BrowserRouter>
)

document.body.style.paddingTop = '30px';
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
