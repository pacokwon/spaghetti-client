import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import AuthHelperMethods from '../../helpers/AuthHelperMethods'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        }
    }
    
    componentDidMount() {
        const Auth = new AuthHelperMethods();

        if (!Auth.loggedIn()) {
            console.log('Not Logged In');
            this.props.history.replace('/login');
        } else {
            try {
                console.log('Confirmation is ' + Auth.getConfirm());

                this.setState({
                    loaded: true
                })
            } catch (e) {
                Auth.logout();
                this.props.history.replace('/login');
            }

        }
    }

    render() {
        if (this.state.loaded) {
            return <div>Hello</div>
        } else {
            return null;
        }
    }
}

export default App;
