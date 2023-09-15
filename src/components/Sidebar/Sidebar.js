import './sidebar.css'

import React, { Component } from 'react'

export class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location = "/admin/login";
    }

    render() {
        return (
            <>
                <div className="custom-col-left d-none d-xl-block bg-dark p-3">
                    <img src="/assets/logo.png" className="img-fluid mt-3 mb-5" alt="..." />
                    <ul className="navbar-nav sidenav">
                        <li className="nav-item">
                            <a href="/admin/blogs" className="nav-link">
                                <i className="fas fa-blog" />
                                Blogs
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/portfolio" className="nav-link">
                                <i className="fas fa-box" />
                                Portfolio
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/statistics" className="nav-link">
                                <i className="fas fa-chart-bar" />
                                Statistics
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/testimonials" className="nav-link">
                                <i className="fas fa-users" />
                                Testimonials
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/account" className="nav-link">
                                <i className="fas fa-user-gear" />
                                Admin Account
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/logout" className="nav-link" onClick={this.logout}>
                                <i className="fas fa-sign-out" />
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="offcanvas offcanvas-end d-xl-none" tabIndex={-1} id="offcanvasContent">
                    <div className="offcanvas-header justify-content-end p-4">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav sidenav">
                            <li className="nav-item">
                                <a href="/admin/blogs" className="nav-link">
                                    <i className="fas fa-blog" />
                                    Blogs
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/admin/portfolio" className="nav-link">
                                    <i className="fas fa-box" />
                                    Portfolio
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/admin/statistics" className="nav-link">
                                    <i className="fas fa-chart-bar" />
                                    Statistics
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/admin/testimonials" className="nav-link">
                                    <i className="fas fa-users" />
                                    Testimonials
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/admin/account" className="nav-link">
                                    <i className="fas fa-user-gear" />
                                    Admin Account
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/admin/logout" className="nav-link" onClick={this.logout}>
                                    <i className="fas fa-sign-out" />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default Sidebar
