import './brands.css'

import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: {},
            id: "",
            company: "",
            logo: "",
            status: 0
        }

        this.addCloseBtn = React.createRef();
        this.handleAdd = this.handleAdd.bind(this);
        this.addClose = this.addClose.bind(this);

        this.deleteBrand = this.deleteBrand.bind(this);

        document.title = "Brands | Admin Panel";
    }

    componentDidMount() {
        axios.get("https://www.overninja.com:8081/brands")
            .then(res => this.setState({ brands: res.data }))
            .catch(err => console.log(err));
    }

    handleAdd(event) {
        event.preventDefault();
        if (this.state.status === 0) {
            this.setState({ status: 1 });
            const formData = new FormData();
            formData.append("company", this.state.company);
            formData.append("logo", this.state.logo);
            axios.post("https://www.overninja.com:8081/brands/add", formData)
                .then(res => {
                    this.setState({ status: 0 });
                    this.componentDidMount();
                    this.addClose();
                    alert("New brand added successfully.");
                })
                .catch(err => {
                    this.setState({ status: 0 });
                    console.log(err);
                    this.addClose();
                });
        }
    }

    addClose() {
        this.setState({
            id: "",
            company: "",
            logo: "",
            status: 0
        });
        this.addCloseBtn.current.click();
    }

    deleteBrand(event) {
        event.preventDefault();
        if (window.confirm("Do you really want to delete this brand?")) {
            axios.post("https://www.overninja.com:8081/brands/delete", { id: event.target.value })
                .then(res => {
                    this.componentDidMount();
                    alert("Brand deleted successfully");
                })
                .catch(err => {
                    console.log(err);
                });
        }
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
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#portfolioAddModal">Add New</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped align-middle brands-table mt-5">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Company</th>
                                                <th scope="col">Added On</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="accordionPortfolio">
                                            {
                                                Object.keys(this.state.brands).map((i) => (
                                                    <>
                                                        <tr>
                                                            <th scope="row">{Number(i) + 1}</th>
                                                            <td>{this.state.brands[i].company}</td>
                                                            <td>{moment(this.state.brands[i].created_on).format("YYYY-MM-DD kk:mm:ss")}</td>
                                                            <td>
                                                                <button className="btn btn-danger" value={this.state.brands[i].id} onClick={this.deleteBrand}><i className="fas fa-trash"></i>&nbsp;&nbsp;Delete</button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="portfolioAddModal" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog modal-lg">
                        <form className="modal-content" onSubmit={this.handleAdd}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Add Brand</h1>
                                <button type="button" className="btn-close" onClick={this.addClose} />
                                <button type="button" ref={this.addCloseBtn} className="d-none" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-4">
                                    <label className="form-label">Company Name</label>
                                    <input type="text" name="company" maxLength={100} className="form-control" required value={this.state.company} onChange={e => this.setState({ company: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Company Logo</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="logo" className="form-control" required onChange={e => this.setState({ logo: e.target.files[0] })} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.addClose}>Close</button>
                                <button type="submit" name="submit" value="apply" className="btn btn-primary">
                                    {
                                        (this.state.status === 1) ? (
                                            <div>
                                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span>Add</span>
                                        )
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Brands
