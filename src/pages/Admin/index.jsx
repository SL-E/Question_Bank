import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import TeachersList from '../../components/TeacherList';
import AddNewTeacherList from '../../components/AddNewTeacherList';

import './index.css';



function Admin() {
    return (
        <div className="admin-dashboard">
            <div className="left-sidebar">
                <h3 className="menu-item dashboard">Dashboard</h3>
                <div className="menu-item">
                    <Link to="#">Account Info</Link>
                </div>
                <div className="menu-item">
                    <Link to="#">Universities</Link>
                </div>
                <div className="menu-item">
                    <Link to="/Admin/divisionlist">List of Divisions</Link>
                </div>
                <div className="menu-item">
                    <Link to="/Admin/teacherslist">List of Teachers</Link>
                </div>
                <div className="menu-item">
                    <Link to="#">Settings</Link>
                </div>
            </div>
            <div className="right-content">
                <Outlet /> {/* Add the Outlet component to render the child routes */}
            </div>
        </div>
    );
}

export default Admin;