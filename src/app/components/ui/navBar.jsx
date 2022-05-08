import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="d-flex">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/users">
                        Users
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBar
