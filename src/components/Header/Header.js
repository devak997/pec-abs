import React from 'react';
import { Link } from 'react-router-dom'

export const Header = ({ isMobileMenuActive, handleClick }) => {
    return (
        <div className="App">
            <nav className="navbar is-info" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        ABS
                    </Link>
                    <a role="button" onClick={handleClick} className={`navbar-burger burger ${isMobileMenuActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="intelligenthawkmenu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="intelligenthawkmenu" className={`navbar-menu ${isMobileMenuActive ? 'is-active' : ''}`}>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            Change Schedule
                        </Link>
                        <Link to="/currentSchedule" className="navbar-item">
                            Current Schedule
                        </Link>
                        <Link to="/logDetails" className="navbar-item">
                            Log
                        </Link>
                        <Link to="/holidayPage" className="navbar-item">
                            Holiday
                        </Link>
                        <Link to="/addHoliday" className="navbar-item">
                            Add Holiday
                        </Link>
                        <Link to="/deleteHoliday" className="navbar-item">
                            Delete Holiday
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}