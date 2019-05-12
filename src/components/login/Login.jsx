import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import classNames from 'classnames';

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            matches: true
        }
    }

    componentWillMount() {
        
    }

    handleSubmit(event) {
        event.preventDefault();

        // get form data
        const form = new FormData(event.target);

        // initialize json object, and fill them in
        let jsonObj = {}
        form.forEach((key, val) => {
            jsonObj[val] = key;
        })
        jsonObj['type'] = 'login';

        // ajax post request for verification
        axios.post("http://localhost:5000/user/check", {
            data: jsonObj
        }).then((res) => {
            console.log(res);
            if (res.data.matches) {
                // redirect to / if user matches
                this.props.history.push('/');
            } else {
                // set matches to false so red message appears
                this.setState({matches: false})
            }
        })
    }

    render() {
        const errorClass = classNames({
            row: true,
            error: true,
            hide: this.state.matches
        });

        return (
            <div className="container">
                <h1>Login</h1>
                <div className="card card-body bg-light">
                    <form id="form" onSubmit={e => this.handleSubmit(e)}>
                        <div className="form-group row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <label htmlFor="username">{'Username'}</label>
                                <input type="text" className="form-control" name="username" id="username" placeholder="Username" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <label htmlFor="password">{'Password'}</label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" />
                            </div>
                        </div>
                        <div className={errorClass} id="error_msg">
                            <div className="col-md-2"> </div>
                            <div className="col-md-8">
                                {'아이디 또는 비밀번호를 다시 확인하세요. 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.'}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-primary form-control">{'Submit'}</button>
                            </div>
                            <div className="col-md-4" style={{ marginTop: '5px' }}>
                                {"Don't have an account?"} <a href='/register'>{'Register now'}</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;