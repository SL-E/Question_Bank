import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TeachersList from '../../components/TeacherList';
import './index.css';

function Admin() {
    const [content, setContent] = useState(""); // State to track content in right-content

    const handleMenuClick = (menu) => {
        switch (menu) {
            case "Account Info":
                setContent("Hello!");
                break;
            case "Universities":
                setContent("UoW");
                break;
            case "List of Divisions":
                setContent("IT");
                break;
            case "List of Tearchers":
                setContent(<TeachersList />);
                break;
            case "Settings":
                setContent("Edit");
                break;

            default:
                setContent(""); // Reset content
                break;
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="left-sidebar">
                <h3 className="menu-item dashboard">Dashboard</h3>
                <div className="menu-item">
                    <Link to="#" onClick={() => handleMenuClick("Account Info")}>Account Info</Link>
                </div>
                <div className="menu-item">
                    <Link to="#" onClick={() => handleMenuClick("Universities")}>Universities</Link>
                </div>
                <div className="menu-item">
                    <Link to="#" onClick={() => handleMenuClick("List of Divisions")}>List of Divisions</Link>
                </div>
                <div className="menu-item">
                    <Link to="#" onClick={() => handleMenuClick("List of Tearchers")}>List of Tearchers</Link>
                </div>
                <div className="menu-item">
                    <Link to="#" onClick={() => handleMenuClick("Settings")}>Settings</Link>
                </div>
            </div>
            <div className="right-content">
                {content && <div>{content}</div>}
            </div>
        </div>
    );
}

export default Admin;