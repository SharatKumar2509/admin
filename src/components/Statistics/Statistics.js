import './statistics.css'

import React, { Component } from 'react'
import axios from 'axios'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export class Statistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clients: '',
            campaign: '',
            revenue: '',
            retention: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);

        document.title = "Statistics | Admin Panel";
    }

    componentDidMount() {
        axios.get("https://www.overninja.com:8081/statistics")
            .then(res => this.setState(res.data[0]))
            .catch(err => console.log(err));
    }

    handleSubmit() {
        var check = true;
        if (this.state.clients === "") {
            check = false;
        }
        if (this.state.campaign === "") {
            check = false;
        }
        if (this.state.revenue === "") {
            check = false;
        }
        if (this.state.retention === "") {
            check = false;
        }
        if (check === false) {
            return false;
        }
        var data = {
            clients: this.state.clients,
            campaign: this.state.campaign,
            revenue: this.state.revenue,
            retention: this.state.retention
        };
        axios.post("https://www.overninja.com:8081/statistics/edit", data)
            .then(res => {
                console.log(res);
                alert("Changes saved successfully.");
            })
            .catch(err => {
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
                            <section className="admin-stats p-3 mt-4 mb-5">
                                <div className="row">
                                    <div className="col-md-6 col-xl-3 pb-5">
                                        <input type="text" className="form-control" value={this.state.clients} onChange={e => this.setState({ clients: e.target.value })} />
                                        <div className="label">Satisfied Clients</div>
                                    </div>
                                    <div className="col-md-6 col-xl-3 pb-5">
                                        <input type="text" className="form-control" value={this.state.campaign} onChange={e => this.setState({ campaign: e.target.value })} />
                                        <div className="label">Campaign Managed</div>
                                    </div>
                                    <div className="col-md-6 col-xl-3 pb-5">
                                        <input type="text" className="form-control" value={this.state.revenue} onChange={e => this.setState({ revenue: e.target.value })} />
                                        <div className="label">Revenue Generated</div>
                                    </div>
                                    <div className="col-md-6 col-xl-3 pb-5">
                                        <input type="text" className="form-control" value={this.state.retention} onChange={e => this.setState({ retention: e.target.value })} />
                                        <div className="label">Client Retention</div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Statistics
