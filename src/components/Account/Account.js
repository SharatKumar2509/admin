import './account.css'

import React, { Component } from 'react'
import axios from 'axios'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: "",
            new: "",
            confirm: "",
            status: 0
        }
        this.handleChange = this.handleChange.bind(this);

        document.title = "Admin Account | Admin Panel";
    }

    handleChange(event) {
        event.preventDefault();
        if (this.state.new !== this.state.confirm) {
            alert("Password mismatch. Please try again.");
            this.setState({
                current: "",
                new: "",
                confirm: ""
            });
            return false;
        }
        this.setState({ status: 1 });
        axios.post("https://www.overninja.com:8081/admin/login", { password: this.state.current })
            .then(res => {
                if (res.data.length === 0) {
                    this.setState({
                        current: "",
                        new: "",
                        confirm: "",
                        status: 0
                    });
                    alert("Incorrect password. Please try again.");
                }
                else {
                    axios.post("https://www.overninja.com:8081/admin/change", { password: this.state.new })
                        .then(res => {
                            this.setState({
                                current: "",
                                new: "",
                                confirm: "",
                                status: 0
                            });
                            alert("Login credentials changed successfully.");
                        })
                        .catch(err => {
                            console.log(err);
                            this.setState({
                                current: "",
                                new: "",
                                confirm: "",
                                status: 0
                            });
                            alert("Something went wrong. Please try again.");
                        })
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    current: "",
                    new: "",
                    confirm: "",
                    status: 0
                });
                alert("Something went wrong. Please try again.");
            });
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row vh-100">
                        <Sidebar />
                        <div className="custom-col-right p-0">
                            <Header />
                            <section className="p-3 mt-4 mb-5">
                                <div className="row">
                                    <div className="col-md-8 col-xl-4 offset-md-2 offset-xl-4">
                                        <form className="card account-card" onSubmit={this.handleChange}>
                                            <div className="card-header">
                                                <h4 className="h4 text-center mt-2">Change Credentials</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3">
                                                    <label className="form-label">Current Password</label>
                                                    <input type="password" name="current" className="form-control" required minLength={8} maxLength={15} value={this.state.current} onChange={e => this.setState({ current: e.target.value })} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">New Password</label>
                                                    <input type="password" name="new" className="form-control" required minLength={8} maxLength={15} value={this.state.new} onChange={e => this.setState({ new: e.target.value })} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Confirm Password</label>
                                                    <input type="password" name="confirm" className="form-control" required minLength={8} maxLength={15} value={this.state.confirm} onChange={e => this.setState({ confirm: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-center">
                                                <button type="reset" className="btn btn-secondary me-3">Reset</button>
                                                <button type="submit" className="btn btn-primary">
                                                    {
                                                        (this.state.status === 1) ? (
                                                            <div>
                                                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span>Save Changes</span>
                                                        )
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Account
