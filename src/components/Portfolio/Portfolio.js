import './portfolio.css'

import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            portfolio: {},
            id: "",
            client: "",
            service: "",
            project_image: "",
            introduction: "",
            challenge: "",
            approach: "",
            status: 0
        }

        this.addCloseBtn = React.createRef();
        this.handleAdd = this.handleAdd.bind(this);
        this.addClose = this.addClose.bind(this);

        this.editOpenBtn = React.createRef();
        this.editCloseBtn = React.createRef();
        this.handleEdit = this.handleEdit.bind(this);
        this.editOpen = this.editOpen.bind(this);
        this.editClose = this.editClose.bind(this);

        this.deletePortfolio = this.deletePortfolio.bind(this);

        document.title = "Portfolio | Admin Panel";
    }

    componentDidMount() {
        axios.get("https://www.overninja.com:8081/portfolio")
            .then(res => this.setState({ portfolio: res.data }))
            .catch(err => console.log(err));
    }

    handleAdd(event) {
        event.preventDefault();
        if (this.state.status === 0) {
            this.setState({ status: 1 });
            const formData = new FormData();
            formData.append("client", this.state.client);
            formData.append("service", this.state.service);
            formData.append("project_image", this.state.project_image);
            formData.append("introduction", this.state.introduction);
            formData.append("challenge", this.state.challenge);
            formData.append("approach", this.state.approach);
            axios.post("https://www.overninja.com:8081/portfolio/add", formData)
                .then(res => {
                    this.setState({ status: 0 });
                    this.componentDidMount();
                    this.addClose();
                    alert("New project added successfully.");
                })
                .catch(err => {
                    this.setState({ status: 0 });
                    console.log(err);
                    this.addClose();
                });
        }
    }

    handleEdit(event) {
        event.preventDefault();
        if (this.state.status === 0) {
            this.setState({ status: 1 });
            const formData = new FormData();
            formData.append("id", this.state.id);
            formData.append("client", this.state.client);
            formData.append("service", this.state.service);
            formData.append("project_image", this.state.project_image);
            formData.append("introduction", this.state.introduction);
            formData.append("challenge", this.state.challenge);
            formData.append("approach", this.state.approach);
            axios.post("https://www.overninja.com:8081/portfolio/edit", formData)
                .then(res => {
                    this.setState({ status: 0 });
                    this.componentDidMount();
                    this.editClose();
                    alert("Project edited successfully.");
                    this.componentDidMount();
                })
                .catch(err => {
                    this.setState({ status: 0 });
                    console.log(err);
                    this.editClose();
                });
        }
    }

    addClose() {
        this.setState({
            id: "",
            client: "",
            service: "",
            project_image: "",
            introduction: "",
            challenge: "",
            approach: "",
            status: 0
        });
        this.addCloseBtn.current.click();
    }

    editOpen(event) {
        event.preventDefault();
        axios.post("https://www.overninja.com:8081/portfolio/get", { id: event.target.value })
            .then(res => {
                this.setState({
                    id: res.data[0].id,
                    client: res.data[0].client,
                    service: res.data[0].service,
                    project_image: null,
                    introduction: res.data[0].introduction,
                    challenge: res.data[0].challenge,
                    approach: res.data[0].approach
                })
            })
            .catch(err => {
                console.log(err);
                return false;
            });
        this.editOpenBtn.current.click();
    }

    editClose() {
        this.setState({
            id: "",
            client: "",
            service: "",
            project_image: "",
            introduction: "",
            challenge: "",
            approach: "",
            status: 0
        });
        this.editCloseBtn.current.click();
    }

    deletePortfolio(event) {
        event.preventDefault();
        if (window.confirm("Do you really want to delete this project?")) {
            axios.post("https://www.overninja.com:8081/portfolio/delete", { id: event.target.value })
                .then(res => {
                    this.componentDidMount();
                    alert("Project deleted successfully");
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
                                    <button className="d-none" type="button" ref={this.editOpenBtn} data-bs-toggle="modal" data-bs-target="#portfolioEditModal">Edit</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped align-middle portfolio-table mt-5">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Client</th>
                                                <th scope="col">Service</th>
                                                <th scope="col">Added On</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="accordionPortfolio">
                                            {
                                                Object.keys(this.state.portfolio).map((i) => (
                                                    <>
                                                        <tr>
                                                            <th scope="row">{Number(i) + 1}</th>
                                                            <td>{this.state.portfolio[i].client}</td>
                                                            <td>{this.state.portfolio[i].service}</td>
                                                            <td>{moment(this.state.portfolio[i].created_on).format("YYYY-MM-DD kk:mm:ss")}</td>
                                                            <td>
                                                                <button className="btn btn-primary me-2 mb-2 mb-md-0" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + i}><i className="fas fa-eye"></i>&nbsp;&nbsp;View</button>
                                                                <button className="btn btn-success me-2 mb-2 mb-md-0" value={this.state.portfolio[i].id} onClick={this.editOpen}><i className="fas fa-edit"></i>&nbsp;&nbsp;Edit</button>
                                                                <button className="btn btn-danger" value={this.state.portfolio[i].id} onClick={this.deletePortfolio}><i className="fas fa-trash"></i>&nbsp;&nbsp;Delete</button>
                                                            </td>
                                                        </tr>
                                                        <tr id={"collapse" + i} className="accordion-collapse collapse" data-bs-parent="#accordionPortfolio">
                                                            <td></td>
                                                            <td colSpan={4}>
                                                                <br />
                                                                <img src={"/assets/portfolio/" + this.state.portfolio[i].project_image} className="img-fluid" alt="..." />
                                                                <br /><br /><br />
                                                                <h4 className="h4">Client Introduction</h4>
                                                                <hr />
                                                                {
                                                                    this.state.portfolio[i].introduction.split("\n").filter(e => { return e.trim().length > 0 }).map((data, i) => (
                                                                        <p>{data}</p>
                                                                    ))
                                                                }
                                                                <br />
                                                                <h4 className="h4">The challenge</h4>
                                                                <hr />
                                                                {
                                                                    this.state.portfolio[i].challenge.split("\n").filter(e => { return e.trim().length > 0 }).map((data, i) => (
                                                                        <p>{data}</p>
                                                                    ))
                                                                }
                                                                <br />
                                                                <h4 className="h4">Our Approach</h4>
                                                                <hr />
                                                                {
                                                                    this.state.portfolio[i].approach.split("\n").filter(e => { return e.trim().length > 0 }).map((data, i) => (
                                                                        <p>{data}</p>
                                                                    ))
                                                                }
                                                                <br />
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
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={this.handleAdd}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Add Project</h1>
                                <button type="button" className="btn-close" onClick={this.addClose} />
                                <button type="button" ref={this.addCloseBtn} className="d-none" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Client</label>
                                    <input type="text" name="client" maxLength={100} className="form-control" required value={this.state.client} onChange={e => this.setState({ client: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Service</label>
                                    <input type="text" name="service" maxLength={50} className="form-control" required value={this.state.service} onChange={e => this.setState({ service: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Project Image</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="image" className="form-control" required onChange={e => this.setState({ project_image: e.target.files[0] })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Client Introduction</label>
                                    <textarea name="introduction" rows={4} className="form-control" maxLength={2000} required value={this.state.introduction} onChange={e => this.setState({ introduction: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">The Challenge</label>
                                    <textarea name="challenge" rows={4} className="form-control" maxLength={2000} required value={this.state.challenge} onChange={e => this.setState({ challenge: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Our Approach</label>
                                    <textarea name="approach" rows={4} className="form-control" maxLength={2000} required value={this.state.approach} onChange={e => this.setState({ approach: e.target.value })}></textarea>
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
                <div className="modal fade" id="portfolioEditModal" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={this.handleEdit}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Edit Project</h1>
                                <button type="button" className="btn-close" onClick={this.editClose} />
                                <button type="button" ref={this.editCloseBtn} className="d-none" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Client</label>
                                    <input type="text" name="client" maxLength={100} className="form-control" required value={this.state.client} onChange={e => this.setState({ client: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Service</label>
                                    <input type="text" name="service" maxLength={50} className="form-control" required value={this.state.service} onChange={e => this.setState({ service: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Project Image</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="image" className="form-control" onChange={e => this.setState({ project_image: e.target.files[0] })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Client Introduction</label>
                                    <textarea name="introduction" rows={4} className="form-control" maxLength={2000} required value={this.state.introduction} onChange={e => this.setState({ introduction: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">The Challenge</label>
                                    <textarea name="challenge" rows={4} className="form-control" maxLength={2000} required value={this.state.challenge} onChange={e => this.setState({ challenge: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Our Approach</label>
                                    <textarea name="approach" rows={4} className="form-control" maxLength={2000} required value={this.state.approach} onChange={e => this.setState({ approach: e.target.value })}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.editClose}>Close</button>
                                <button type="submit" name="submit" value="apply" className="btn btn-primary">
                                    {
                                        (this.state.status === 1) ? (
                                            <div>
                                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span>Save</span>
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

export default Portfolio
