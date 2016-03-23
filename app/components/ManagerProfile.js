import React from 'react';
import { Link } from 'react-router';
import ManagerActions from '../actions/ManagerActions';
import ManagerStore from '../stores/ManagerStore';

class ManagerProfile extends React.Component {
  constructor(props){
  	super(props);
  	this.state = ManagerStore.getState();
  	this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
  	ManagerStore.listen(this.onChange);
  	//catch-all for loading
  	//all required fields into state
  	ManagerActions.getManagerProfile();
  }

  componentWillUnmount(){
  	ManagerStore.unlisten(this.onChange)
  }

  onChange(state) {
  	this.setState(state);
  }

  render() {

  	const managedShelters = this.state.managerObjectShelters.map((shelter) => {
  		return(

  			<Link to={'/manage-shelters/' + shelter.shelterID}>
		  		<div key={shelter.shelterID} className="well">
            <div className="shelterInfo text-left text-capitalize">
              <h3>Shelter Information</h3>
                <div className="org"><span>Organization: {shelter.organizationName ? shelter.organizationName : "Unknown Organization"}</span></div>
                <div><span className="shelterName">Shelter Name: {shelter.shelterName ? shelter.shelterName : "unknown"}</span> </div>
                <div><span>Daytime Phone: {shelter.shelterDaytimePhone ? shelter.shelterDaytimePhone : "unknown"}</span> </div>
                <div><span>Emergency Phone: {shelter.shelterEmergencyPhone ? shelter.shelterEmergencyPhone : "unknown"}</span></div>
              <h4>Location Information</h4>
                <div><span>Location Name: {shelter.locationName ? shelter.locationName : "Unknown"}</span></div>
                <div><span>Street Address: {shelter.locationStreet ? shelter.locationStreet : "Unknown"}</span></div>
                <div><span>City: {shelter.locationCity ? shelter.locationCity : "Unknown"}</span></div>
                <div><span>State: {shelter.locationState ? shelter.locationState : "Unknown"}</span></div>
                <div><span>Zip: {shelter.locationZip ? shelter.locationZip : "Unknown"}</span></div>
              <h4>Hours of Operation</h4>
                <div><span>Monday: {shelter.hoursMonday ? shelter.hoursMonday : "Unknown"}</span></div>
                <div><span>Tuesday: {shelter.hoursTuesday ? shelter.hoursTuesday : "Unknown"}</span></div>
                <div><span>Wednesday: {shelter.hoursWednesday ? shelter.hoursWednesday : "Unknown"}</span></div>
                <div><span>Thursday: {shelter.hoursThursday ? shelter.hoursThursday : "Unknown"}</span></div>
                <div><span>Friday: {shelter.hoursFriday ? shelter.hoursFriday : "Unknown"}</span></div>
                <div><span>Saturday: {shelter.hoursSaturday ? shelter.hoursSaturday : "Unknown"}</span></div>
                <div><span>Sunday: {shelter.hoursSunday ? shelter.hoursSunday : "Unknown"}</span></div>
		  		  </div>
          </div>
		  	</Link>
	  	)
  	})
    return (
      <div className ="well col-sm-6 col-sm-offset-3 text-left">
      	<h2>Manage Shelters</h2>
      		<p>Hello,</p>
      		<p>You currently manage the following shelter(s):</p>
      	<div className="shelterInfo">
      		{managedShelters}
      	</div>
      </div>
    );
  }
}

export default ManagerProfile;
