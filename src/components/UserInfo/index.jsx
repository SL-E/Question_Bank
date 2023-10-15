import React from 'react';
import '../../components/UserInfo/index.css';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '********',
      organisation: '',
      division: '',
      course: ''
    };
  }

  handlePasswordChangeRequest = () => {
    // Handle password change request logic here
    alert('Password change request received!');
  }

  render() {
    return (
      <div className="userInfoContainer">
        <h2>User Information</h2>
        <div className="userInfoField">
          <label>First Name: </label>
          <span>{this.state.firstname}</span>
        </div>
        <div className="userInfoField">
          <label>Last Name: </label>
          <span>{this.state.lastname}</span>
        </div>
        <div className="userInfoField">
          <label>Email: </label>
          <span>{this.state.email}</span>
        </div>
        <div className="userInfoField">
          <label>Password: </label>
          <span>{this.state.password}</span>
          <button onClick={this.handlePasswordChangeRequest}>Change Password</button>
        </div>
        <div className="userInfoField">
          <label>Organisation: </label>
          <span>{this.state.organisation}</span>
        </div>
        <div className="userInfoField">
          <label>Division: </label>
          <span>{this.state.division}</span>
        </div>
        <div className="userInfoField">
          <label>Course: </label>
          <span>{this.state.course}</span>
        </div>
      </div>
    );
  }
}

export default UserInfo;
