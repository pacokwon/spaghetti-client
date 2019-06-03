import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import ProfileCard from './subcomponents/ProfileCard.jsx';
import Spaghetti from './Spaghetti.jsx';
import PreferenceDialog from './subcomponents/PreferenceDialog.jsx'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/exc' component={PreferenceDialog} />
                    <Route exact path='/profile' component={ProfileCard} />
                    <Route path="*" component={Spaghetti} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
