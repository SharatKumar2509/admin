import './login.css'

import React, { Component } from 'react'
import axios from 'axios';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            status: 0
        }
        this.handleLogin = this.handleLogin.bind(this);

        document.title = "Login | Admin Panel";
    }

    handleLogin(event) {
        event.preventDefault();
        if (this.state.status === 0) {
            this.setState({ status: 1 });
            var data = {
                password: this.state.password
            };
            axios.post("https://www.overninja.com:8081/admin/login", data)
                .then(res => {
                    this.setState({ password: "", status: 0 });
                    if (res.data.length === 0) {
                        alert("Invalid login credentials. Please try again.");
                    }
                    else {
                        localStorage.setItem("isLoggedIn", true);
                        window.location = "/blogs";
                    }
                })
                .catch(err => {
                    this.setState({ password: "", status: 0 });
                    console.log(err);
                    alert("Something went wrong. Please try again.");
                });
        }
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="card">
                    <form className="card-body" onSubmit={this.handleLogin}>
                        <div className="user-icon">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <h4 className="h4">Admin Panel</h4>
                        <label className="form-label mt-4">Login to continue</label>
                        <input type="password" className="form-control" minLength={8} maxLength={15} required autoFocus={true} placeholder="Enter Admin Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                        <button type="submit" className="btn btn-primary mt-5 mb-4">
                            {
                                (this.state.status === 1) ? (
                                    <div>
                                        <div className="spinner-border spinner-border-sm text-light" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <span>Login</span>
                                )
                            }
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
