import React from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router';

class AdminSignup extends React.Component {
  constructor(){
    super();
    this.state = {email: "", password: "", firstName: "", lastName: '', phone: '', orgName: ''}
    this.update = this.update.bind(this);
  }
  update(e){
    this.setState({
      email: ReactDOM.findDOMNode(this.refs.email.refs.inp).value,
      password: ReactDOM.findDOMNode(this.refs.password.refs.inp).value,
      firstName: ReactDOM.findDOMNode(this.refs.firstName.refs.inp).value,
      lastName: ReactDOM.findDOMNode(this.refs.lastName.refs.inp).value,
      phone: ReactDOM.findDOMNode(this.refs.phone.refs.inp).value,
      orgName: ReactDOM.findDOMNode(this.refs.orgName.refs.inp).value
    })
  }
  submitForm(e){
    e.preventDefault();
  let adminInfo = {adminUser: {firstName: this.state.firstName, lastName: this.state.lastName,
      password: this.state.password, email: this.state.email, phone: this.state.phone}, organizations:{ orgName: this.state.orgName}};
    console.log("User info submit", adminInfo)
    this.post(adminInfo)
  }

  post(data){
    console.log('data ', data);

    $.ajax({
      type: 'POST',
      url: '/api/signupAdmin',
      data: data,
      success: function(data){
        window.location.href = "./";
      },
      fail: function(err){
        console.log('err', err);
      }
    });
  }
  render(){
    return (
      <div className ="col-sm-6 col-sm-offset-3 text-center">
        <form>
        <h1>Email</h1>
        <AccountInfo ref = 'email' update={this.update} />

        <h1>Password</h1>
        <AccountInfo ref = 'password' update={this.update} />

        <h1>First Name</h1>
        <AccountInfo ref = 'firstName' update={this.update} />

        <h1>Last Name</h1>
        <AccountInfo ref = 'lastName' update={this.update} />

        <h1>Phone Number</h1>
        <AccountInfo ref = 'phone' update={this.update} />

        <h1>Org Name</h1>
        <AccountInfo ref = 'orgName' update={this.update} />

        <br/>
        <button type='submit' onClick={this.submitForm.bind(this)}>click me</button>

        </form>
      </div>
  )
  }
}

class AccountInfo extends React.Component  {
  render(){
    return(
      <div>
        <input ref="inp" type = "text"
          onChange={this.props.update} />
      </div>)
  }
}


export default AdminSignup
