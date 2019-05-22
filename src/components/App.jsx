import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import PersistentDrawerLeft from './ExampleDrawer.jsx';
import ProfileCard from './ProfileCard.jsx';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/drawer' component={PersistentDrawerLeft} />
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/' component={NavBar} /> 
                    <Route exact path='/profile' component={ProfileCard} /> 
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;