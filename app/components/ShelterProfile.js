import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';
import ShelterMap from './GoogleMapsView.js';


class ShelterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = alt.stores.ShelterStore.state;
  }

  render() {
    const theShelter = this.state.shelters.filter((shelter) => {
      return shelter.shelterName === this.props.params.id;
    })[0];
     console.log('var should be ', theShelter)
    return (
       <div className ="well col-sm-6 col-sm-offset-3 text-left">
         <div className="well shelterProfile">
         <div className="bg-primary"><h3>{theShelter.organizationName}</h3></div>
          <div className="text-capitalize"><h2>{theShelter.shelterName}</h2></div>
          <div className="text-left">
          <span className="col-sm-5">at <b>{theShelter.locationName} </b>
            {theShelter.locationStreet}
            <br/>
            {theShelter.locationCity}, 
            {theShelter.locationState} 
            {theShelter.locationZip}



          </span>

 
          

          </div>
          <div className="contactInfo text-right">
            <div><label>Daytime Phone:</label> {theShelter.shelterDaytimePhone}</div>
            <div><label>Emergency Phone:</label> {theShelter.shelterEmergencyPhone}</div>
            <div><a href="mailto:{theShelter.shelterEmail}">{theShelter.shelterEmail}</a></div>
          </div>
          <ShelterMap
            shelters={theShelter}
          />
          <span>
          <div>
          
            <h3>
              <div className="">{theShelter.total_units} units at this location: </div>
              <br/>
              <div className="label label-danger">{theShelter.occupied_units} taken</div> 
              <div className="label label-success">{theShelter.total_units - theShelter.occupied_units} available</div>                        
            </h3>
            <br/>
          <label>Reach them by phone @ </label> {theShelter.locationPhone}
          <br/>
            <label>Hours</label>
            <div>
              <div>Monday: {theShelter.hoursMonday}</div>
              <div>Tuesday: {theShelter.hoursTuesday}</div>
              <div>Wednesday: {theShelter.hoursWednesday}</div>
              <div>Thursday: {theShelter.hoursThursday}</div>
              <div>Friday: {theShelter.hoursFriday}</div>
              <div>Saturday: {theShelter.hoursSaturday}</div>
              <div>Sunday: {theShelter.hoursSunday}</div>
            </div>
          </div>
          </span>
          </div>
        </div>
    );
  }
}

// fixes
ShelterProfile.propTypes = {
  params: React.PropTypes.object,
};

export default ShelterProfile;
