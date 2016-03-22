import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class UserProfileEdit extends React.Component {
	constructor(props) {
		super(props);
    this.handleClick = this.handleClick.bind(this);
	}

  handleClick(e) {
    e.preventDefault();
    var first = this.refs.firstName.value || this.props.userInfo.userFirstName;
    var last = this.refs.lastName.value || this.props.userInfo.userLastName;
    var email = this.refs.email.value || this.props.userInfo.userEmail;
    var password = this.refs.password.value;
    var phone = this.refs.phone.value || this.props.userInfo.userPhone;
    var flag = this.refs.password.value.length === 0 ? false : true;
    this.props.save(
      first,
      last,
      email,
      password,
      phone,
      flag
    )
    this.props.clicker(
      this.props.clicked ? false : true
    )
  }

  render() {
    return (
      <form className="text-left">
        <div>
          <label>First Name</label>
          <input type='text' ref='firstName' placeholder={this.props.userInfo.userFirstName} />
        </div>
        <div>
          <label>Last Name</label>
          <input type='text' ref='lastName' placeholder={this.props.userInfo.userLastName} />
        </div>
        <div>
          <label>Email:</label>
          <input type='email' ref='email' placeholder={this.props.userInfo.userEmail} />
        </div>
        <div>
          <label>Password</label>
            <input type='password' ref='password' size='6' />
        </div>
        <div>
          <label>Phone</label>
          <input type='tel' ref='phone' placeholder={this.props.userInfo.userPhone} />
        </div>
        <button className="btn btn-primary editButton" onClick={this.handleClick} >Save Changes</button>
      </form>
    );
  }
}

export default UserProfileEdit;
