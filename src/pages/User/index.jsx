import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import '../../pages/User/index.css';

function User() {
    return (
        <div className="User-dashboard">
            <div className="left-sidebar-U">
                <h3 className="menu-item-U dashboard">Dashboard</h3>
                <div className="menu-item-U">
                    <Link to="/User/UserInfo">Account Info</Link>
                </div>
                <div className="menu-item-U">
                    <Link to="#">My Courses</Link>
                </div>
                <div className="menu-item-U">
                    <Link to="/User/MyQuestions">My Questions</Link>
                </div>
                <div className="menu-item-U">
                    <Link to="#">Archive History</Link>
                </div>
                <div className="menu-item-U">
                    <Link to="#">Settings</Link>
                </div>
            </div>
            <div className="right-content-U">
                <Outlet /> {/* Add the Outlet component to render the child routes */}
            </div>
        </div>
    );
}

export default User;