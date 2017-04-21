import './login.scss';

import React from 'react';
import AuthenService from '../../services/AuthenService';


export default class Login extends React.Component {

    login(e) {
        e.preventDefault();
        var $btn = $('#login-btn').button('loading');
        AuthenService.login(
            this.refs.username.value,
            this.refs.password.value
        ).catch(function () {
            alert('Please check username and password!!');
            $btn.button('reset');
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="login-panel panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Mitrphol Integrity Assessment</h3>
                            </div>
                            <div className="panel-body">
                                <form role="form">
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control"
                                                   placeholder="Username"
                                                   name="username"
                                                   type="text" ref="username"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control"
                                                   placeholder="Password"
                                                   name="password"
                                                   type="password" ref="password"/>
                                        </div>
                                        <button type="submit"
                                                className="btn btn-lg btn-success btn-block"
                                                data-loading-text="Login..."
                                                id="login-btn"
                                                onClick={this.login.bind(this)}>
                                            Login
                                        </button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
