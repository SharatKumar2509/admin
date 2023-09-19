import './blogs.css'

import React, { Component } from 'react'
import JoditEditor from 'jodit-react'
import axios from 'axios'
import moment from 'moment'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

export class Blogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: {},
            id: "",
            title: "",
            author: "",
            content: "",
            blog_image: "",
            alt_text: "",
            meta_desc: "",
            meta_keywords: "",
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

        this.deleteblog = this.deleteblog.bind(this);

        document.title = "Blogs | Admin Panel";
    }

    componentDidMount() {
        axios.get("https://www.overninja.com:8081/blogs")
            .then(res => this.setState({ blogs: res.data }))
            .catch(err => console.log(err));
    }

    handleAdd(event) {
        event.preventDefault();
        if (this.state.status === 0) {
            this.setState({ status: 1 });
            const formData = new FormData();
            formData.append("title", this.state.title);
            formData.append("author", this.state.author);
            formData.append("content", this.state.content);
            formData.append("blog_image", this.state.blog_image);
            formData.append("alt_text", this.state.alt_text);
            formData.append("meta_desc", this.state.meta_desc);
            formData.append("meta_keywords", this.state.meta_keywords);
            axios.post("https://www.overninja.com:8081/blogs/add", formData)
                .then(res => {
                    this.setState({ status: 0 });
                    this.componentDidMount();
                    this.addClose();
                    alert("New blog added successfully.");
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
            formData.append("title", this.state.title);
            formData.append("author", this.state.author);
            formData.append("content", this.state.content);
            formData.append("blog_image", this.state.blog_image);
            formData.append("alt_text", this.state.alt_text);
            formData.append("meta_desc", this.state.meta_desc);
            formData.append("meta_keywords", this.state.meta_keywords);
            axios.post("https://www.overninja.com:8081/blogs/edit", formData)
                .then(res => {
                    this.setState({ status: 0 });
                    this.componentDidMount();
                    this.editClose();
                    alert("Blog edited successfully.");
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
            title: "",
            content: "",
            blog_image: "",
            alt_text: "",
            meta_desc: "",
            meta_keywords: "",
            status: 0
        });
        this.addCloseBtn.current.click();
    }

    editOpen(event) {
        event.preventDefault();
        axios.post("https://www.overninja.com:8081/blogs/get", { path: event.target.value })
            .then(res => {
                this.setState({
                    id: res.data[0].id,
                    title: res.data[0].title,
                    author: res.data[0].author,
                    content: res.data[0].content,
                    blog_image: "",
                    alt_text: res.data[0].alt_text,
                    meta_desc: res.data[0].meta_desc,
                    meta_keywords: res.data[0].meta_keywords
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
            title: "",
            author: "",
            content: "",
            blog_image: "",
            alt_text: "",
            meta_desc: "",
            meta_keywords: "",
            status: 0
        });
        this.editCloseBtn.current.click();
    }

    deleteblog(event) {
        event.preventDefault();
        if (window.confirm("Do you really want to delete this blog?")) {
            axios.post("https://www.overninja.com:8081/blogs/delete", { id: event.target.value })
                .then(res => {
                    this.componentDidMount();
                    alert("Blog deleted successfully");
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
                                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#blogAddModal">Add New</button>
                                    <button className="d-none" type="button" ref={this.editOpenBtn} data-bs-toggle="modal" data-bs-target="#blogEditModal">Edit</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped align-middle blog-table mt-5">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Added On</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="accordionblog">
                                            {
                                                Object.keys(this.state.blogs).map((i) => (
                                                    <>
                                                        <tr>
                                                            <th scope="row">{Number(i) + 1}</th>
                                                            <td>{this.state.blogs[i].title}</td>
                                                            <td>{moment(this.state.blogs[i].created_on).format("YYYY-MM-DD kk:mm:ss")}</td>
                                                            <td>
                                                                {/* <button className="btn btn-primary me-2 mb-2 mb-md-0" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + i}><i className="fas fa-eye"></i>&nbsp;&nbsp;View</button> */}
                                                                <a href={"https://www.overninja.com/Blogs/"+this.state.blogs[i].path} className="btn btn-primary me-2 mb-2" target="_blank" rel="noreferrer noopener"><i className="fas fa-eye"></i>&nbsp;&nbsp;View</a>
                                                                <button className="btn btn-success me-2 mb-2" value={this.state.blogs[i].path} onClick={this.editOpen}><i className="fas fa-edit"></i>&nbsp;&nbsp;Edit</button>
                                                                <button className="btn btn-danger" value={this.state.blogs[i].id} onClick={this.deleteblog}><i className="fas fa-trash"></i>&nbsp;&nbsp;Delete</button>
                                                            </td>
                                                        </tr>
                                                        <tr id={"collapse" + i} className="accordion-collapse collapse" data-bs-parent="#accordionblog">
                                                            <td></td>
                                                            <td colSpan={4}>
                                                                <br />
                                                                <h2 className="h2">{this.state.blogs[i].title}</h2>
                                                                <hr />
                                                                <img src={"/assets/blogs/" + this.state.blogs[i].blog_image} className="img-fluid" alt="..." />
                                                                <br /><br /><br />
                                                                <h5 className="h5">Meta Description</h5>
                                                                <hr />
                                                                <p>{this.state.blogs[i].meta_desc}</p>
                                                                <br />
                                                                <h5 className="h5">Meta Keywords</h5>
                                                                <hr />
                                                                <p>{this.state.blogs[i].meta_keywords}</p>
                                                                <br />
                                                                <h5 className="h5">Content</h5>
                                                                <hr />
                                                                <div>{this.state.blogs[i].content}</div>
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
                <div className="modal fade" id="blogAddModal" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog modal-lg">
                        <form className="modal-content" onSubmit={this.handleAdd}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Add Blog</h1>
                                <button type="button" className="btn-close" onClick={this.addClose} />
                                <button type="button" ref={this.addCloseBtn} className="d-none" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" name="title" maxLength={500} className="form-control" required value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Author</label>
                                    <input type="text" name="author" maxLength={200} className="form-control" required value={this.state.author} onChange={e => this.setState({ author: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Meta Description</label>
                                    <textarea name="meta_desc" rows={3} className="form-control" maxLength={1000} required value={this.state.meta_desc} onChange={e => this.setState({ meta_desc: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Blog Image</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="blog_image" className="form-control" required onChange={e => this.setState({ blog_image: e.target.files[0] })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image Alt Text</label>
                                    <input type="text" name="alt_text" maxLength={200} className="form-control" required value={this.state.alt_text} onChange={e => this.setState({ alt_text: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Content</label>
                                    <JoditEditor required config={{height: 400}} value={this.state.content} onBlur={(newContent) => this.setState({ content: newContent })} />
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
                <div className="modal fade" id="blogEditModal" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog modal-lg">
                        <form className="modal-content" onSubmit={this.handleEdit}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Edit Blog</h1>
                                <button type="button" className="btn-close" onClick={this.editClose} />
                                <button type="button" ref={this.editCloseBtn} className="d-none" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" name="title" maxLength={500} className="form-control" required value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Author</label>
                                    <input type="text" name="author" maxLength={200} className="form-control" required value={this.state.author} onChange={e => this.setState({ author: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Meta Description</label>
                                    <textarea name="meta_desc" rows={3} className="form-control" maxLength={1000} required value={this.state.meta_desc} onChange={e => this.setState({ meta_desc: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Blog Image</label>
                                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.JPG,.JPEG,.PNG,.WEBP" name="blog_image" className="form-control" onChange={e => this.setState({ blog_image: e.target.files[0] })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image Alt Text</label>
                                    <input type="text" name="alt_text" maxLength={200} className="form-control" required value={this.state.alt_text} onChange={e => this.setState({ alt_text: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Content</label>
                                    <JoditEditor required config={{height: 400}} value={this.state.content} onBlur={(newContent) => this.setState({ content: newContent })} />
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

export default Blogs
