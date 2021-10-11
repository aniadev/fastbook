import React from 'react'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm fixed">
            <div className="navbar-brand mr-1">
                <img src={process.env.PUBLIC_URL + '/img/logo.png'} width="40" height="40" alt="logo" />
            </div>
            <span className="navbar-brand mb-0">Fakebook</span>

            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-dropdown" aria-controls="navbar-dropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <form className="form-search">
                <input type="search" placeholder="Search" aria-label="Search" />
            </form>

            <div className="navbar-user">
                <img src="https://www.pngarea.com/pngm/468/3428536_default-avatar-png-profile-demo-hd-png-download.png" width="36" height="36" alt="avatar" />
                <p>Phạm Công Hải</p>
            </div>

            <div className="dropdown">
                <button className="dropdown-toggle btn-sm" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
                    <a className="dropdown-item" href="http://anicorp.tk">My profile</a>
                    <a className="dropdown-item" href="http://anicorp.tk">Messenger</a>
                    <a className="dropdown-item" href="http://anicorp.tk">Friends</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="http://anicorp.tk">Logout</a>
                </div>
            </div>
        </nav>
    )
}


export default Navbar

