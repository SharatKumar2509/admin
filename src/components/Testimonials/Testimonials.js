import './testimonials.css'

import React, { Component } from 'react'
import axios from 'axios'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export class Testimonials extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testimonials: {},
            id: "",
            fullname: "",
            designation: "",
            company: "",
            review: "",
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

        this.deleteTestimonial = this.deleteTestimonial.bind(this);

        document.title = "Testimonials | Admin Panel";
    }

    componentDidMount() {
        axios.get("https://www.overninja.com:8081/testimonials")
            .then(res => this.setState({ testimonials: res.data }))
            .catch(err => console.log(err));
    }

    handleAdd(event) {
        event.preventDefault();
        if (this.state.status === 0) {
            this.setState({ status: 1 });
            var data = {
                fullname: this.state.fullname,
                designation: this.state.designation,
                company: this.state.company,
                review: this.state.review
            };
            axios.post("https://www.overninja.com:8081/testimonial/add", data)
                .then(res => {
                    this.addClose();
                    this.componentDidMount();
                    alert("New testimonial added successfully.");
                })
                .catch(err => {
                    console.log(err);
                    this.addClose();
                });
        }
    }

    handleEdit(event) {
        event.preventDefault();
        if (this.state.status === 0) {
            this.setState({ status: 1 });
            var data = {
                id: this.state.id,
                fullname: this.state.fullname,
                designation: this.state.designation,
                company: this.state.company,
                review: this.state.review
            };
            axios.post("https://www.overninja.com:8081/testimonial/edit", data)
                .then(res => {
                    this.editClose();
                    this.componentDidMount();
                    alert("Testimonial edited successfully.");
                })
                .catch(err => {
                    console.log(err);
                    this.editClose();
                });
        }
    }

    addClose() {
        this.setState({
            fullname: "",
            designation: "",
            company: "",
            review: "",
            status: 0
        });
        this.addCloseBtn.current.click();
    }

    editOpen(event) {
        event.preventDefault();
        axios.post("https://www.overninja.com:8081/testimonial/get", { id: event.target.value })
            .then(res => {
                this.setState({
                    id: res.data.id,
                    fullname: res.data.fullname,
                    designation: res.data.designation,
                    company: res.data.company,
                    review: res.data.review
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
            fullname: "",
            designation: "",
            company: "",
            review: "",
            status: 0
        });
        this.editCloseBtn.current.click();
    }

    deleteTestimonial(event) {
        event.preventDefault();
        if (window.confirm("Do you really want to delete this testimonial?")) {
            axios.post("https://www.overninja.com:8081/testimonial/delete", { id: event.target.value })
                .then(res => {
                    this.componentDidMount();
                    alert("Testimonial deleted successfully");
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
                                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#testimonialAddModal">Add New</button>
                                    <button className="d-none" type="button" ref={this.editOpenBtn} data-bs-toggle="modal" data-bs-target="#testimonialEditModal">Edit</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped align-middle testimonial-table mt-5">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Fullname</th>
                                                <th scope="col">Designation</th>
                                                <th scope="col">Company</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="accordionTestimonial">
                                            {
                                                Object.keys(this.state.testimonials).map((i) => (
                                                    <>
                                                        <tr>
                                                            <th scope="row">{Number(i) + 1}</th>
                                                            <td>{this.state.testimonials[i].fullname}</td>
                                                            <td>{this.state.testimonials[i].designation}</td>
                                                            <td>{this.state.testimonials[i].company}</td>
                                                            <td>
                                                                <button className="btn btn-primary me-2 mb-2 mb-md-0" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + i}><i className="fas fa-eye"></i>&nbsp;&nbsp;View</button>
                                                                <button className="btn btn-success me-2 mb-2 mb-md-0" value={this.state.testimonials[i].id} onClick={this.editOpen}><i className="fas fa-edit"></i>&nbsp;&nbsp;Edit</button>
                                                                <button className="btn btn-danger" value={this.state.testimonials[i].id} onClick={this.deleteTestimonial}><i className="fas fa-trash"></i>&nbsp;&nbsp;Delete</button>
                                                            </td>
                                                        </tr>
                                                        <tr id={"collapse" + i} className="accordion-collapse collapse" data-bs-parent="#accordionTestimonial">
                                                            <td></td>
                                                            <td colSpan={4}>
                                                                <b className="d-block mb-2">Review :</b>
                                                                {this.state.testimonials[i].review}
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
                <div className="modal fade" id="testimonialAddModal" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={this.handleAdd}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Add Testimonial</h1>
                                <button type="button" className="btn-close" onClick={this.addClose} />
                                <button type="button" ref={this.addCloseBtn} className="d-none" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Fullname</label>
                                    <input type="text" name="fname" maxLength={50} className="form-control" required value={this.state.fullname} onChange={e => this.setState({ fullname: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Designation</label>
                                    <input type="text" name="designation" maxLength={50} className="form-control" required value={this.state.designation} onChange={e => this.setState({ designation: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Company</label>
                                    <input type="text" name="company" maxLength={100} className="form-control" required value={this.state.company} onChange={e => this.setState({ company: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Review</label>
                                    <textarea name="review" rows={4} className="form-control" required value={this.state.review} onChange={e => this.setState({ review: e.target.value })}></textarea>
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
                                        ) : (this.state.status === 2) ? (
                                            <div>
                                                <i className="fas fa-circle-check"></i>
                                            </div>
                                        ) : (this.state.status === 3) ? (
                                            <div>
                                                <i className="fas fa-circle-xmark"></i>
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
                <div className="modal fade" id="testimonialEditModal" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={this.handleEdit}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Edit Testimonial</h1>
                                <button type="button" className="btn-close" onClick={this.editClose} />
                                <button type="button" ref={this.editCloseBtn} className="d-none" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Fullname</label>
                                    <input type="text" name="fname" maxLength={50} className="form-control" required value={this.state.fullname} onChange={e => this.setState({ fullname: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Designation</label>
                                    <input type="text" name="designation" maxLength={50} className="form-control" required value={this.state.designation} onChange={e => this.setState({ designation: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Company</label>
                                    <input type="text" name="company" maxLength={100} className="form-control" required value={this.state.company} onChange={e => this.setState({ company: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Review</label>
                                    <textarea name="review" rows={4} className="form-control" required value={this.state.review} onChange={e => this.setState({ review: e.target.value })}></textarea>
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
                                        ) : (this.state.status === 2) ? (
                                            <div>
                                                <i className="fas fa-circle-check"></i>
                                            </div>
                                        ) : (this.state.status === 3) ? (
                                            <div>
                                                <i className="fas fa-circle-xmark"></i>
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

export default Testimonials
