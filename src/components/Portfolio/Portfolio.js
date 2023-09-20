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
            benefits: "",
            introduction: "",
            requirement: "",
            challenge: "",
            process: "",
            results: "",
            title1: "",
            title2: "",
            title3: "",
            value1: "",
            value2: "",
            value3: "",
            project_image_1: "",
            project_image_2: "",
            project_image_3: "",
            project_image_4: "",
            project_image_5: "",
            project_image_6: "",
            status: 0
        }

        this.addCloseBtn = React.createRef();
        this.handleAdd = this.handleAdd.bind(this);
        this.addClose = this.addClose.bind(this);

        this.deletePortfolio = this.deletePortfolio.bind(this);

        document.title = "Case Studies | Admin Panel";
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
            formData.append("benefits", this.state.benefits);
            formData.append("introduction", this.state.introduction);
            formData.append("requirement", this.state.requirement);
            formData.append("challenge", this.state.challenge);
            formData.append("process", this.state.process);
            formData.append("results", this.state.results);
            formData.append("title1", this.state.title1);
            formData.append("title2", this.state.title2);
            formData.append("title3", this.state.title3);
            formData.append("value1", this.state.value1);
            formData.append("value2", this.state.value2);
            formData.append("value3", this.state.value3);
            formData.append("project_image_1", this.state.project_image_1);
            formData.append("project_image_2", this.state.project_image_2);
            formData.append("project_image_3", this.state.project_image_3);
            formData.append("project_image_4", this.state.project_image_4);
            formData.append("project_image_5", this.state.project_image_5);
            formData.append("project_image_6", this.state.project_image_6);
            axios.post("https://www.overninja.com:8081/portfolio/add", formData)
                .then(res => {
                    this.setState({ status: 0 });
                    this.componentDidMount();
                    this.addClose();
                    alert("New case study added successfully.");
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
            client: "",
            benefits: "",
            introduction: "",
            requirement: "",
            challenge: "",
            process: "",
            results: "",
            title1: "",
            title2: "",
            title3: "",
            value1: "",
            value2: "",
            value3: "",
            project_image_1: "",
            project_image_2: "",
            project_image_3: "",
            project_image_4: "",
            project_image_5: "",
            project_image_6: "",
            status: 0
        });
        this.addCloseBtn.current.click();
    }

    deletePortfolio(event) {
        event.preventDefault();
        if (window.confirm("Do you really want to delete this project?")) {
            axios.post("https://www.overninja.com:8081/portfolio/delete", { id: event.target.value })
                .then(res => {
                    this.componentDidMount();
                    alert("Case study deleted successfully");
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
                                    <table className="table table-striped align-middle portfolio-table mt-5">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Client</th>
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
                                                            <td>{moment(this.state.portfolio[i].created_on).format("YYYY-MM-DD kk:mm:ss")}</td>
                                                            <td>
                                                                <a href={"https://www.overninja.com/CaseStudies/" + this.state.portfolio[i].id} className="btn btn-primary me-2 mb-2 mb-md-0" target="_blank" rel="noreferrer noopener"><i className="fas fa-eye"></i>&nbsp;&nbsp;View</a>
                                                                <button className="btn btn-danger" value={this.state.portfolio[i].id} onClick={this.deletePortfolio}><i className="fas fa-trash"></i>&nbsp;&nbsp;Delete</button>
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
                                <h1 className="modal-title fs-5">Add Case Study</h1>
                                <button type="button" className="btn-close" onClick={this.addClose} />
                                <button type="button" ref={this.addCloseBtn} className="d-none" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-4">
                                    <label className="form-label">Client</label>
                                    <input type="text" name="client" maxLength={100} className="form-control" required value={this.state.client} onChange={e => this.setState({ client: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Benefits</label>
                                    <textarea name="benefits" rows={3} className="form-control" maxLength={1000} required value={this.state.benefits} onChange={e => this.setState({ benefits: e.target.value })}></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Introduction</label>
                                    <textarea name="introduction" rows={3} className="form-control" maxLength={1000} required value={this.state.introduction} onChange={e => this.setState({ introduction: e.target.value })}></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Client Requirement</label>
                                    <textarea name="requirement" rows={3} className="form-control" maxLength={1000} required value={this.state.requirement} onChange={e => this.setState({ requirement: e.target.value })}></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">The Challenge</label>
                                    <textarea name="challenge" rows={3} className="form-control" maxLength={1000} required value={this.state.challenge} onChange={e => this.setState({ challenge: e.target.value })}></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">The Process</label>
                                    <textarea name="process" rows={3} className="form-control" maxLength={1000} required value={this.state.process} onChange={e => this.setState({ process: e.target.value })}></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">The Results</label>
                                    <textarea name="results" rows={3} className="form-control" maxLength={1000} required value={this.state.results} onChange={e => this.setState({ results: e.target.value })}></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Statistics</label>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="text" name="title1" maxLength={100} className="form-control" value={this.state.title1} onChange={e => this.setState({ title1: e.target.value })} /></td>
                                                <td><input type="text" name="value1" maxLength={100} className="form-control" value={this.state.value1} onChange={e => this.setState({ value1: e.target.value })} /></td>
                                            </tr>
                                            <tr>
                                                <td><input type="text" name="title2" maxLength={100} className="form-control" value={this.state.title2} onChange={e => this.setState({ title2: e.target.value })} /></td>
                                                <td><input type="text" name="value2" maxLength={100} className="form-control" value={this.state.value2} onChange={e => this.setState({ value2: e.target.value })} /></td>
                                            </tr>
                                            <tr>
                                                <td><input type="text" name="title3" maxLength={100} className="form-control" value={this.state.title3} onChange={e => this.setState({ title3: e.target.value })} /></td>
                                                <td><input type="text" name="value3" maxLength={100} className="form-control" value={this.state.value3} onChange={e => this.setState({ value3: e.target.value })} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Project Image 1</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="project_image_1" className="form-control" required onChange={e => this.setState({ project_image_1: e.target.files[0] })} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Project Image 2</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="project_image_2" className="form-control" required onChange={e => this.setState({ project_image_2: e.target.files[0] })} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Project Image 3</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="project_image_3" className="form-control" required onChange={e => this.setState({ project_image_3: e.target.files[0] })} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Project Image 4</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="project_image_4" className="form-control" required onChange={e => this.setState({ project_image_4: e.target.files[0] })} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Project Image 5</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="project_image_5" className="form-control" required onChange={e => this.setState({ project_image_5: e.target.files[0] })} />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Project Image 6</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="project_image_6" className="form-control" required onChange={e => this.setState({ project_image_6: e.target.files[0] })} />
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

export default Portfolio
