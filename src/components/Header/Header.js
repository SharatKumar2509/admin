import './header.css'

import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-xl bg-light sticky-top navbar-admin">
                <div className="container-fluid">
                    <div className="navbar-brand" href="/">
                        {
                            (window.location.pathname === "/inquiry") ? "Inquiry"
                                : (window.location.pathname === "/subscribers") ? "Subscribers"
                                    : (window.location.pathname === "/applications") ? "Job Applications"
                                        : (window.location.pathname === "/posts") ? "Job Posts"
                                            : (window.location.pathname === "/case-studies") ? "Case Studies"
                                                : (window.location.pathname === "/blogs") ? "Blogs"
                                                    : (window.location.pathname === "/statistics") ? "Statistics"
                                                        : (window.location.pathname === "/testimonials") ? "Testimonials"
                                                            : (window.location.pathname === "/account") ? "Admin Account"
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
