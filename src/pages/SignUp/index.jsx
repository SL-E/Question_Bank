import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './index.css';

function SignUp() {
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = response => {
      if (response) {
        setIsVerified(true);
      }
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      if (isVerified) {
        // 执行表单提交操作
        console.log('Form submitted!');
      } else {
        alert('Please complete the CAPTCHA verification first!');
      }
    };
    return (
        
            <div className="sign-up-box">
                <div className='sign-up-title'>Question Bank sign up</div>
                <div className='sign-up-content'>
                    <div className='sign-up-tip'>
                        <h4>Already have an account?</h4>
                        <Link to="/login">
                            <div>Login</div>
                        </Link>
                        <span>|</span>
                        <div>Forgot Password</div>
                        <span>|</span>
                        <div>Forgot Username</div>
                    </div>
                    <div className='sign-up-part'>
                        <span>Personal Details</span>
                        <div className='sign-up-part-left'>
                            <div>First Name*</div>
                            <input placeholder='First Name'></input>
                            <div>Last Name*</div>
                            <input placeholder='Last Name'></input>
                        </div>
                        <div className='sign-up-part-right'>
                            <div>lmportant note: Please do not create a new account if youthink you have one already.</div> 
                            <div>To change your personal detailssuch as your surname, or need to change the school/organisation with which you are affiliated, please contact us.</div>
                        </div>
                    </div>
                    <div className='sign-up-part'>
                        <span>Email Details</span>
                        <div className='sign-up-part-left'>
                            <div>Username/Permanent email address*</div>
                            <input placeholder='yourname@example.com'></input>
                            <div>Confirm your email*</div>
                            <input placeholder='yourname@example.com'></input>
                            <div>School email or organizational email(optional)</div>
                            <input placeholder='yourname@example.com'></input>
                                <div class="sign-up-part-password-field">
                                    <div>Set your login password*</div>
                                    <input placeholder='Alphanumeric: More than 8 digits' type="password" id="password1" name="password1" required/>
                                </div>
                                <div class="sign-up-part-password-field">
                                    <div>Repeat your password*</div>
                                    <input placeholder='Alphanumeric: More than 8 digits' type="password" id="password2" name="password2" required/>
                                </div> 
                        </div>
                        <div className='sign-up-part-right'>
                            <div>The email address you enter here will become your userame for Question Bank. </div>
                            <div>If you wish to change it after registration, you will need to contact us.</div>
                        </div> 
                    </div>
                    <div className='sign-up-part'>
                        <span>Other Details</span>
                        <div className='sign-up-other-details'>
                            <div>Date of Birth (dd/mm/yyyy)*</div>
                            <input type="date"/>
                        </div>
                        <div className='sign-up-other-details'>
                            <div>Country/Temitory of birth*</div>
                            <select>
                                <option value="option1">Europe</option>
                                <option value="option2">Asia</option>
                                <option value="option3">America</option>
                                <option value="option4">Oceania</option>
                            </select>
                        </div>
                        <div className='sign-up-other-details'>
                            <div>Place of birth*</div>
                            <input></input>
                        </div>
                    </div>
                    <div className='sign-up-part'>
                        <span>Security Check</span>
                        <ReCAPTCHA sitekey="6LeIxAcTAAAAAGDYwTEbZcY3_dRkLutN4exvVa0f" />
                    </div>
                    <div className='sign-up-part'>
                        <span>Team & Conditions</span>
                        <div className='sign-up-team'>
                            <div> 
                                By clicking below you agree to the terms and conditions
                            </div>
                            <label>
                                <input type="checkbox" name="fruit" value="apple" />
                                <span> I confirm acceptance</span>
                            </label>
                            <div> 
                            Any Personal data that you provide will be handled in line only with the Question Bank.
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sign-up-button'>Create my account</div>
            </div>
        
    )
}

export default SignUp