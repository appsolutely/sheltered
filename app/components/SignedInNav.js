import React from 'react';
import { Link } from 'react-router';

class SignedInNav extends React.Component {
	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this);
	}
    

    logOut(e){
      e.preventDefault(e);
      document.cookie = "sessionId" + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = "../";
  	}


	render() {
		return (
			<div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <ul className="header-signedInNav nav navbar-nav">
              <a className="navbar-brand" href="/">
                <img alt="Sheltered" className="brand-logo" src="./favicon.png" />
              </a>
                  <li>
                    <Link to="/">
                      <span className="glyphicon glyphicon-list-alt"></span>
                        Shelter Listings
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-shelter">
                      <span className="glyphicon glyphicon-plus-sign"></span>
                        Add Shelter
                    </Link>
                  </li>
                  <li>
                    <Link to="/manage-shelters">
                      <span className="glyphicon glyphicon-folder-open"></span>
                        Manage Shelters
                    </Link>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/user-profile">
                      <span className="glyphicon glyphicon-user">
                      </span>
                        My Account
                    </Link>
                  </li>
                 <li><Link to="" onClick={this.logOut}><span className="glyphicon glyphicon-log-out"></span> Log Out</Link></li>
               </ul>
          </div>
        </nav>
	      	  <div className="welcome text-right">
	          </div>
	        </div>
		)
	}
}

export default SignedInNav;