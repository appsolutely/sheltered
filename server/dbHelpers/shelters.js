var db = require('../../db/db.js');
var config = require('../../knexfile.js');
var env =  process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);
var location = require('./locations.js');



var getOrgID = function(orgName){
  return knex.select('*')
              .from('organizations')
              .where('organizationName', orgName)
  .catch(function(err){
    console.error("Could not find organization with this name.", err);
    throw new Error("Could not find organization with this name", err);
  })
  .then(function(orgID){

    return orgID[0].organizationID;
  });
};

module.exports.insertShelter = function(req){
    var name = req.shelters.shelterName;
    var email = req.shelters.shelterEmail;
    var emergencyPhone = req.shelters.shelterEmergencyPhone;
    var daytimePhone = req.shelters.shelterDayTimePhone;
    var locationID;
    var hoursID;

    return location.insertLocation(req)
      .then(function(resp){
        console.log('response from insert location ', resp)
        locationID = resp[0].locationID;
        hoursID = resp[0].fk_hourID;
        return;
      })
      .catch(function(err){
        console.error("There was a problem adding this location");
      })
      .then(function(){
        return getOrgID(req.organizations.orgName)
          .then(function(org){
            return knex('shelters')
                    .insert({
                        shelterName: name,
                        shelterEmail: email,
                        shelterEmergencyPhone: emergencyPhone,
                        shelterDaytimePhone: daytimePhone,
                        fk_organizationID: org,
                        fk_locationID: locationID,
                        fk_hourID: hoursID
                      })
                    .returning('*')
              .catch(function(err){
                console.error("Something went wrong inserting this shelter ", err);
                throw new Error("Something went wrong inserting this shelter ", err);
              })
              .then(function(shelter){
                return shelter;
              });
          });
      });
};

var getShelterID = function(shelterName){
      return knex.select('shelterID').from('shelters')
          .where('shelterName', shelterName)
          .catch(function(err){
            console.error("Something went wrong. This shelter may not exist.");
            throw new Error("Something went wrong. This shelter may not exist.");
          })
          .then(function(shelterID){
            return shelterID;
          });

};

module.exports.selectShelter = function(req){
    var shelter = req.shelters.shelterName || req.shelters;
    return getShelterID(shelter)
      .then(function(shelter){
        var shelterID = shelter[0].shelterID;
        return knex.select('shelterID', 'fk_organizationID', 'shelterName', 'fk_locationID', 'shelterEmail', 'shelterEmergencyPhone', 'shelterDaytimePhone', 'locationName', 'locationStreet', 'locationCity', 'locationState', 'locationZip', 'locationPhone', 'lat', 'long')
                  .count('shelterUnitID as total_units')
                  .count('occupancyID as occupied_units')
                  .from('shelters')
                  .leftOuterJoin('locations', 'shelters.fk_locationID', 'locations.locationID')
                  .leftOuterJoin('shelterUnits', 'shelters.shelterID', 'shelterUnits.fk_shelterID')
                  .leftOuterJoin('shelterOccupancy', 'shelterUnits.shelterUnitID', 'shelterOccupancy.fk_shelterUnitID')
                  .where('shelterID', shelterID)
                  .groupBy('shelterID', 'locationID')
          .catch(function(err){
            console.error("Something went wrong selecting this shelter ", err);
            throw new Error("Something went wrong selecting this shelter", err);
          })
          .then(function(shelter){
            return shelter;
          });
      });
};


module.exports.selectAllShelters = function(){
    return knex.select('organizationID', 'organizationName', 'shelterID', 'fk_organizationID', 'shelterName', 'fk_locationID', 'shelterEmail', 'shelterEmergencyPhone', 'shelterDaytimePhone', 'locationName', 'locationStreet', 'locationCity', 'locationState', 'locationZip', 'locationPhone', 'lat', 'long', 'hoursMonday', 'hoursTuesday', 'hoursWednesday', 'hoursThursday', 'hoursFriday', 'hoursSaturday', 'hoursSunday')
                .count('shelterUnitID as total_units')
                .count('occupancyID as occupied_units')
                .count('shelterEligibilityID as eligibility_rules')
                .from('shelters')
                .innerJoin('organizations', 'shelters.fk_organizationID', 'organizations.organizationID')
                .leftOuterJoin('locations', 'shelters.fk_locationID', 'locations.locationID')
                .leftOuterJoin('hours', 'locations.fk_hourID', 'hours.hoursID')
                .leftOuterJoin('shelterEligibility', 'shelters.shelterID', 'shelterEligibility.fk_shelterID')
                .leftOuterJoin('shelterUnits', 'shelters.shelterID', 'shelterUnits.fk_shelterID')
                .leftOuterJoin('shelterOccupancy', 'shelterUnits.shelterUnitID', 'shelterOccupancy.fk_shelterUnitID')
                .groupBy('organizationID', 'shelterID', 'locationID',  'hoursID')
      .catch(function(err){
        console.error("Something went wrong selecting all shelters", err);
        throw new Error("Something went wrong selecting all shelters", err);
      })
      .then(function(shelters){
        return shelters;
      });
};

module.exports.updateShelter = function(req){
  //function for updating shelter units
    var name = req.shelters.shelterName;
    var email = req.shelters.shelterEmail;
    var emergencyPhone = req.shelters.shelterEmergencyPhone;
    var daytimePhone = req.shelters.shelterDayTimePhone;
    var shelterID = req.shelters.shelterID;
    var updated;
    return knex('shelters')
            .where('shelterID', shelterID)
            .update({
                shelterName: name,
                shelterEmail: email,
                shelterEmergencyPhone: emergencyPhone,
                shelterDaytimePhone: daytimePhone
            })
            .returning('*')
        .catch(function(err){
          console.error('err in updateShelter', err);
          throw new Error("Error updating this shetler", err);
        })
        .then(function(updatedShelter){
          updated = updatedShelter;
        })
        .then(function(){
          return location.updateLocation(req);
        })
        .then(function(){
          return updated;
        });
};

module.exports.deleteShelter = function(req){
  var shelterID = req[0].shelterID;
      return knex('shelters')
              .returning('*')
              .where('shelterID', shelterID)
              .del()
      .catch(function(err){
        console.error("Something went wrong deleting this shelter");
        throw new Error("Something went wrong deleting this shelter");
      })
      .then(function(shelter){
        return shelter;
      });

};


module.exports.insertShelterUnit = function(req){
  var unitSize = req.shelterUnit.unitSize;
  var unitName = req.shelterUnit.unitName;
  return getShelterID(req.shelters.shelterName)
      .then(function(shelter){
        var shelterID = shelter[0].shelterID;
        return knex('shelterUnits')
                .insert({
                  fk_shelterID: shelterID,
                  unitSize: unitSize,
                  unitName: unitName
                })
                .returning('*')
        .catch(function(err){
          console.error("Something went wrong inserting this shelter unit.", err);
          throw new Error("Something went wrong inserting this shelter unit.", err);
        })
        .then(function(shelterUnit){
          return shelterUnit;
        });

      });
};

module.exports.deleteShelterUnit = function(req){
    var shelterUnitID = req.unit.shelterUnitID;

    return knex('shelterUnits')
              .returning('*')
              .where('shelterUnitID', shelterUnitID)
              .del()
    .catch(function(err){
      console.error("Something went wront deleting this shelter unit", err);
      throw new Error("Something went wront deleting this shelter unit", err);
    })
    .then(function(shelterUnit){
      return shelterUnit;
    });
};


var getEligibilityID = function(eligibilityOption){
    return knex.select('eligibilityOptionID').from('eligibilityOptions')
        .where('eligibilityOption', eligibilityOption)
        .catch(function(err){
          console.error("Something went wrong. This eligibility option may not exist.");
          throw new Error("Something went wrong. This eligibility option may not exist.");
        })
        .then(function(eligibilityOptionID){
          return eligibilityOptionID[0].eligibilityOptionID;
        });
};


module.exports.insertShelterEligibility = function(req){
  //function for inserting shelter elgibiltiy rules
  var eligibility = req.eligibility.eligibilityOption;
  return getEligibilityID(eligibility)
      .then(function(eligibilityID){
        var eligibilityOptionID = eligibilityID;
            return getShelterID(req.shelterName)
            .then(function(shelter){
                var shelterID = shelter[0].shelterID;
                return knex('shelterEligibility')
                        .insert({
                          fk_shelterID: shelterID,
                          fk_eligibilityOptionID: eligibilityOptionID
                        })
                        .returning('*')
                .catch(function(err){
                  console.error("Something went wrong inserting this shelter eligibility", err);
                  throw new Error("Something went wrong inserting this shelter eligibility", err);
                })
                .then(function(eligibility){
                  return eligibility;
                });

            });
      });

};

module.exports.deleteShelterEligibility = function(req){
  var shelterEligID = req.shelterEligibilityID;

    return knex('shelterEligibility')
              .returning('*')
              .where('shelterEligibilityID', shelterEligID)
              .del()
    .catch(function(err){
      console.error("Something went wront deleting this shelter eligibility", err);
      throw new Error("Something went wront deleting this shelter eligibility", err);
    })
    .then(function(shelterEligibility){
      return shelterEligibility;
    });
  //function for deleting specific shelter eligibility rule
};

module.exports.insertShelterOccupancy = function(req){
  var occupant = req.occupancy.name;
  var entranceDate = req.occupancy.entranceDate;
  var exitDate = req.occupancy.exitDate || null;
  // var occupantDOB = req.occupancy.dob;
  var unitID = req.occupancy.unitID;

        return knex('shelterOccupancy')
                .insert({
                  fk_shelterUnitID: unitID,
                  occupiedByName: occupant,
                  entranceDate: entranceDate,
                  exitDate: exitDate
                })
                .returning('*')
          .catch(function(err){
            console.error("There was an error inserting this occupancy record ", err);
            throw new Error("There was an error inserting this occupancy record ", err);
          })
          .then(function(shelterOccupant){
            return shelterOccupant;
          });
  // //inserting new
};

var getOccupancyUnitID = function(occupancyID){

  return knex.select('shelterOccupancy')
              .where('occupancyID', occupancyID)
              .returning('fk_shelterUnitID')
      .catch(function(err){
        console.error("Something went wrong selecting this occupied unitID", err);
        throw new Error("Something went wrong selecting this occupied unitID", err);
      })
      .then(function(unitID){
        return unitID;
      });

};


module.exports.updateShelterOccupancy = function(req){
  //function for updating shelter occupancy for a given user
  var occupancyID = req.occupancy.occupancyID;
  var occupantName = req.occupancy.name;
  var entranceDate = req.occupancy.entranceDate;
  var exitDate = req.occupancy.exitDate;

  if (occupantName){
  return knex('shelterOccupancy')
          .where('occupancyID', occupancyID)
          .update({
            occupiedByName: occupantName
          })
          .returning('*')
          .catch(function(err){
            console.error("Error updating this shetler occupancy", err);
            throw new Error("Error updating this shetler occupancy", err);
          })
    .then(function(updatedOccupancy){
      return updatedOccupancy;
    });
  } else {
    return knex('shelterOccupancy')
      .where('occupancyID', occupancyID)
      .update({
        entranceDate: entranceDate,
        exitDate: exitDate
      })
      .returning('*')
      .catch(function(err){
        console.error("Error updating this shetler occupancy", err);
        throw new error("Error updating this shetler occupancy", err);
      })
      .then(function(updatedOccupancy){
        return updatedOccupancy;
      });
    }

};

module.exports.selectShelterOccupancy = function(req){
  var occupantID = req;
    return knex('shelterOccupancy')
              .where('occupancyID', occupantID)
              .returning('*')
          .catch(function(err){
            console.error("Error selecting this occupancy record", err);
            throw new Error("Error selecting this occupancy record", err);
          })
          .then(function(occupancy){
            return occupancy;
          });

};


module.exports.deleteShelterOccupancy = function(req){
  //function for deleting specific shelter occupancy record
  var occupantID = req.occupant;
    return knex('shelterOccupancy')
              .returning('*')
              .where('occupancyID', occupantID)
              .del()
          .catch(function(err){
            console.error("Something went wrong deleting this occupancy record", err);
            throw new Error("Something went wrong deleting this occupancy record", err);
          })
          .then(function(occupancy){
            return occupancy;
          });
};

module.exports.findShelterByID = function(shelterID) {
  return knex.select('*')
              .from('shelters')
              .fullOuterJoin('locations', 'shelters.fk_locationID', 'locations.locationID')
              .where('shelterID', shelterID)
        .catch(function(err){
          console.error('There was an error in findShelterByID ', err);
          throw err;
        })
        .then(function(result){
          return result[0];
        });
};

module.exports.shelterOccupancyDetails = function(req){
  var orgID = req;
  return knex.select('*')
              .from('organizations')
              .leftOuterJoin('shelters', 'organizations.organizationID', 'shelters.fk_organizationID')
              .leftOuterJoin('shelterUnits', 'shelters.shelterID', 'shelterUnits.fk_shelterID')
              .leftOuterJoin('shelterOccupancy', 'shelterUnits.shelterUnitID', 'shelterOccupancy.fk_shelterUnitID')
              .where('organizationID', orgID)
        .catch(function(err){
          console.error('There was an error selecting this shelter occupancy details', err);
          throw new Error('There was an error selecting this shelter occupancy details', err);
        })
        .then(function(result){
          return result;
        });
};

module.exports.shelterOccupancySummary = function(){
  return knex.select('shelterID', 'shelterName')
              .count('shelterUnitID as total_units')
              .count('occupancyID as occupied_units')
              .from('shelters')
              .leftOuterJoin('shelterUnits', 'shelters.shelterID', 'shelterUnits.fk_shelterID')
              .leftOuterJoin('shelterOccupancy', 'shelterUnits.shelterUnitID', 'shelterOccupancy.fk_shelterUnitID')
              .groupBy('shelterID')
      .catch(function(err){
        console.error('There was a problem returning this shelter occupancy summary', err);
        throw new Error('There was a problem returning this shelter occupancy summary', err);
      })
      .then(function(result){
        return result;
      });
};

module.exports.selectAllOccupants = function(shelterName) {
  return knex.select('occupiedByName', 'shelterUnitID', 'occupancyID', 'entranceDate', 'exitDate', 'unitName', 'unitSize')
              .from('shelterUnits')
              .fullOuterJoin('shelterOccupancy', 'shelterOccupancy.fk_shelterUnitID', 'shelterUnits.shelterUnitID')
              .fullOuterJoin('shelters', 'shelters.shelterID', 'shelterUnits.fk_shelterID')
              .where('shelters.shelterName', shelterName)
              .groupBy('shelterUnitID', 'occupancyID');
};
