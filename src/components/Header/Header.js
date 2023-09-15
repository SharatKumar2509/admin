import './header.css'

import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-xl bg-light sticky-top navbar-admin">
                <div className="container-fluid">
                    <div className="navbar-brand" href="/">
                        {
                            (window.location.pathname === "/admin/inquiry") ? "Inquiry"
                                : (window.location.pathname === "/admin/subscribers") ? "Subscribers"
                                    : (window.location.pathname === "/admin/applications") ? "Job Applications"
                                        : (window.location.pathname === "/admin/posts") ? "Job Posts"
                                            : (window.location.pathname === "/admin/portfolio") ? "Portfolio"
                                                : (window.location.pathname === "/admin/blogs") ? "Blogs"
                                                    : (window.location.pathname === "/admin/statistics") ? "Statistics"
                                                        : (window.location.pathname === "/admin/testimonials") ? "Testimonials"
                                                            : (window.location.pathname === "/admin/account") ? "Admin Account"
                                                                : "Admin Dashboard"
                        }
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                </div>
            </nav>
        )
    }
}

export default Header
