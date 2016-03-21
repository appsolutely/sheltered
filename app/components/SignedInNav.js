import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';

class SignedInNav extends React.Component {
	constructor(props){
		super(props)
		this.logOut = this.logOut.bind(this);
	}
    

    logOut(e){
      e.preventDefault(e);
      document.cookie = "sessionId" + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = "../";
  	}


	render(){
		return(
			<div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">

               <ul className='header-signedInNav nav navbar-nav'>
                 <li><Link to='/admin-profile'>Admin Profile</Link></li>
                 <li><Link to='/manager-profile'>Manager Profile</Link></li>
                 <li><Link to="/user-profile"> My Account </Link></li>
                 <li></li>
               </ul>
          </div>
        </nav>
	      	  <div className="welcome text-right">
	            
	            <button className="btn btn-primary" type='button' onClick={this.logOut}>Log Out</button>
	          </div>
	        </div>
		)
	}
}

export default SignedInNav;