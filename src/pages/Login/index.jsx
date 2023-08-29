
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../api';
import userStore from '../../store/user'
import './index.css';

function Login() {
    const navigate = useNavigate();
    const userNameRef = useRef()
    const passWordRef = useRef()
    const onCreateNewAccount = () => {
    }
    const onLogin = async () => {
       const userName = userNameRef.current.value
       const passWord = passWordRef.current.value
       const res = await userLogin({
            userName,
            passWord
       })
       const isSuccess = res.data.success;
       if(isSuccess){
        userStore.changeLoginStatus(true)
        userStore.setUserInfo(res.data.data || {})
        navigate('/home')
       }else{ 
        alert('login fail')
       }
    }
    return (
        <div className="login-box">
            <div className='login-content'>
                <div className='login-content-left'>
                    <p>Registered User</p>
                    <div className='login-content-left-option'>Login</div>
                    <div className='login-content-left-tip'>Username(email address you registered with)</div>
                    <input ref={userNameRef} placeholder='Please Input Your Email'></input>
                    <div className='login-content-left-forget'>Forgot username?</div>
                    <div className='login-content-left-option'>Password</div>
                    <input type="password" ref={passWordRef} placeholder='Please Input Your Password'></input>
                    <div className='login-content-left-forget'>Forgot password?</div>
                    <div className='login-content-left-login' onClick={onLogin}>Login</div>
                </div>
                <div className='divider'></div>
                <div className='login-content-right'>
                    <div className='login-content-right-part'>New to Question Bank</div>
                    <div className='login-content-right-content'>Only create a new account if you are new to Question Bank. During registration, we will ask you minimal personal information sowe can confirm you as a unique user.</div>
                    <Link to="/signUp">
                        <div className='login-content-create' onClick={onCreateNewAccount}>Create new account</div>
                    </Link>
                    <div className='login-content-right-part'>Need help?</div>
                    <div className='login-content-right-content'>If you have trouble logging in, or if you need to update your personal information or school/organization affiliation, please contact us.</div>
                </div>
            </div>
        </div>
    )
}

export default Login