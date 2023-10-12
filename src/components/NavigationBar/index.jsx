import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {observer} from 'mobx-react-lite'
import userStore from '../../store/user';
import { userLoginout } from '../../api/index';
import './index.css'

function NavigationBar() {
    const navigate = useNavigate();
    const onLogout = async () => {
        const res = await userLoginout(userStore.userInfo);
        if(res?.data?.success){
            userStore.changeLoginStatus(false)
            userStore.setUserInfo({})
            navigate('/login')
        }
    }
    
    return (
        <div className="navigation-bar-box">
            <div>
                <nav className="navigation-container">
                    <ul className="navigation-list">
                        <li><Link to="/Home">Home</Link></li>
                        <li className="dropdown">
                            <div className="dropdown-content">
                                <Link to="/course/view">View Course</Link>
                                <Link to="/course/create">Create Course</Link>
                            </div>  
                            <div>Course <span className="dropdown-arrow">&#9662;</span></div>
                        </li>
                        <li className="dropdown">
                            <div className="dropdown-content">
                                <Link to="/question/view">View Question</Link>
                                <Link to="/question/edit">Edit Question</Link>
                                {/* 添加其他选项 */}
                            </div>
                            <div>Question <span className="dropdown-arrow">&#9662;</span></div>
                        </li>
                        <li className="dropdown">
                            <div className="dropdown-content">
                                <Link to="/exam/view">View Exam</Link>
                                <Link to="/exam/new">Create Exam</Link>
                                <Link to="/exam/preview">Preview Exam</Link>
                            </div>
                            <div>Exam <span className="dropdown-arrow">&#9662;</span></div>
                        </li>
                        <li className="dropdown">
                            <div className="dropdown-content">
                                <Link to="/archive/view">View Archive</Link>
                                <Link to="/archive/edit">Export Archive</Link>
                                {/* 添加其他选项 */}
                            </div>
                            <div>Archive <span className="dropdown-arrow">&#9662;</span></div>
                        </li>
                        <li><Link to="#">Search</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                        <li>{userStore.isLogin ? (
                        <div className='login-user-info-box'>
                            <span>Hello, {userStore?.userInfo?.first_name}{userStore?.userInfo?.last_name}</span>
                            <span className='logout' onClick={onLogout} >Loginout</span>
                        </div>): (<Link to="/Login">Login</Link>)}</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default observer(NavigationBar)