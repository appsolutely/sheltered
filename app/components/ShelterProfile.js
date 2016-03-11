import React from 'react';
import { Link } from 'react-router';
import alt from '../alt';


class ShelterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = alt.stores.ShelterStore.state;
  }
  componentDidMount() {
    console.log('shelter name', this.props.params.id);
    console.log('I mounted sugar', alt.stores.ShelterStore.state);
  }

  render() {
    const theShelter = this.state.shelters.filter((shelter) => {
      return shelter.shelterName === this.props.params.id;
    })[0];
     // console.log('var should be ', theShelter)
    return (
        <div className="jumbotron col-sm-6 col-sm-offset-3 text-center defaultShelter">
			<div className="shelterProfile">
				<h3>{theShelter.shelterName}</h3>
				<h4>{theShelter.shelterDaytimePhone}</h4>
        <h4>{theShelter.shelterEmail}</h4>
        <h4>{theShelter.locationStreet}</h4>
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

