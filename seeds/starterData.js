var shelterHelpers = require('../server/dbHelpers/shelters.js');
var orgHelpers = require('../server/dbHelpers/organizations.js');
var userHelpers = require('../server/dbHelpers/users.js');

var minorsOptID, adultsOptID, substAddictOptID, vetsOptID, womenOptID, menOptID;
var ageID, houseSizeID, armedForcesID, exOffenderID, healthID, traumaSurvivorID;
var hours1ID, hours2ID, hours3ID, hours4ID, hours5ID, hours6ID, hours7ID;

var shelter1 = {shelters: {shelterName: "Men's Emergency Night Shelter", shelterEmail: "email@men.com", shelterDayTimePhone:"512-444-4445", shelterEmergencyPhone:"512-444-4445"},
 locations: {name:"Front Door Main Building", street:"500 E 7th St" , city:"Austin" , state:"TX" , zip:"78701", phone:"512-305-4100"},
 organizations: {orgName: "Front Door"},
 hours: {monday: "Open 8am to 4pm", tuesday: "Open 8am to 4pm", wednesday: "Open 8am to 4pm", thursday: "Open 8am to 4pm", friday: "Open 8am to 4pm", saturday: "Open 8am to 4pm", sunday: "Open 8am to 4pm"}
};

var shelter2 = {shelters: {shelterName: "Men's Day Sleep", shelterEmail: "email@men.com", shelterDayTimePhone:"512-444-4445", shelterEmergencyPhone:"512-444-4445"},
  organizations: {orgName: "Angels' Army"},
  locations: {name:"Front Door Main Building", street:"500 E 7th St" , city:"Austin" , state:"TX" , zip:"78701", phone:"512-305-4100"},
  hours: {monday: "Open 8am to 4pm", tuesday: "Open 8am to 4pm", wednesday: "Open 8am to 4pm", thursday: "Open 8am to 4pm", friday: "Open 8am to 4pm", saturday: "Open 8am to 4pm", sunday: "Open 8am to 4pm"}
};

var shelter3 = { shelters: {shelterName: "Men's Cold Weather Shelter", shelterEmail: "MENweathershelter@frontsteps.org", shelterDayTimePhone:"512-444-4233" , shelterEmergencyPhone:"512-444-4445"},
  organizations: {orgName: 'Safe House'},
  locations: {name:"Stepfield Church" , street:"501 E 7th St" , city:"Austin" , state:"TX" , zip:"78777", phone:"512-305-4101"},
  hours: {monday: "Open 24", tuesday: "Open 24", wednesday: "Open 24", thursday: "Open 24", friday: "Open 24", saturday: "Open 24", sunday: "Open 24"}
};

var shelter4 = { shelters: {shelterName: "Women's Emergency Night Shelter", shelterEmail: "email@women.com", shelterDayTimePhone:"512-333-3335", shelterEmergencyPhone:"512-333-3335"},
organizations: {orgName: "Front Door"},
locations: {name:"Convention Center", street:"502 E 7th St" , city:"Austin" , state:"TX" , zip:"78745", phone:"512-305-4102"},
hours: {monday: "Open 24", tuesday: "Open 24", wednesday: "Open 24", thursday: "Open 24", friday: "Open 24", saturday: "Open 24", sunday: "Open 24"}
};

var shelter5 = { shelters:{shelterName: "Women's Day Sleep", shelterEmail: "email@women.com", shelterDayTimePhone:"512-333-3335", shelterEmergencyPhone:"512-333-3335"},
  organizations: {orgName: "Angels' Army"},
  locations: {name:"Healing Home" , street:"503 E 7th St" , city:"Austin" , state:"TX" , zip:"78756", phone:"512-305-4103"},
  hours: {monday: "Open 6am to 5pm", tuesday: "Open 6am to 5pm", wednesday: "Open 6am to 5pm", thursday: "Open 6am to 5pm", friday: "Open 6am to 5pm", saturday: "Open 6am to 5pm", sunday: "Open 6am to 5pm"}
};

var shelter5 = {shelters: {shelterName: "Women's Cold Weather Shelter", shelterEmail: "womenweathershelter@frontsteps.org", shelterDayTimePhone:"512-333-4233" , shelterEmergencyPhone:"512-333-3335"},
  organizations: {orgName: "Safe House"},
  locations: {name:"Healing Home" , street:"503 E 7th St" , city:"Austin" , state:"TX" , zip:"78756", phone:"512-305-4103"},
  hours: {monday: "Open 6am to 5pm", tuesday: "Open 6am to 5pm", wednesday: "Open 6am to 5pm", thursday: "Open 6am to 5pm", friday: "Open 6am to 5pm", saturday: "Open 6am to 5pm", sunday: "Open 6am to 5pm"}
};

var shelter6 = { shelters:{shelterName: "Children and Teen's Emergency Night Shelter", shelterEmail: "email@children.com", shelterDayTimePhone:"512-222-2225", shelterEmergencyPhone:"512-222-2225"},
  organizations: {orgName: "Front Door"},
  locations: {name:"Bolder Building", street:"504 E 7th St" , city:"Austin" , state:"TX" , zip:"78704", phone:"512-305-4104"},
  hours: {monday: "Open 24", tuesday: "Open 24", wednesday: "Open 24", thursday: "Open 24", friday: "Open 24", saturday: "Open 24", sunday: "Open 24"}
};

var shelter7 = { shelters:{shelterName: "Youth Day Sleep", shelterEmail: "email@children.com", shelterDayTimePhone:"512-222-2225", shelterEmergencyPhone:"512-222-2225"},
  organizations: {orgName: "Angels' Army"},
  locations: {name:"Popup Shelter on 7th", street:"505 E 7th St" , city:"Austin" , state:"TX" , zip:"78703", phone:"512-305-4105"},
  hours: {monday: "Open 7am to 3pm", tuesday: "Open 7am to 3pm", wednesday: "Open 7am to 3pm", thursday: "Open 7am to 3pm", friday: "Open 7am to 3pm", saturday: "Open 7am to 3pm", sunday: "Open 7am to 3pm"}
};

var shelter8 = { shelters:{shelterName: "Children's Cold Weather Shelter Program", shelterEmail: "childrenweathershelter@frontsteps.org", shelterDayTimePhone:"512-222-4233" , shelterEmergencyPhone:"512-222-2225"},
  organizations: {orgName: "Safe House"},
  locations: {name:"Alpha Delta Phi Helping Home" , street:"506 E 7th St" , city:"Austin" , state:"TX" , zip:"78787", phone:"512-305-4106"},
  hours:{monday: "Open 24", tuesday: "Open 24", wednesday: "Open 24", thursday: "Open 24", friday: "Open 24", saturday: "Open 24", sunday: "Closed"}
};

var shelter9 = { shelters: {shelterName: "Emergency Night Shelter", shelterEmail: "email@email.com", shelterDayTimePhone:"512-555-5555", shelterEmergencyPhone:"512-555-5555"},
   organizations: {orgName: "Front Door"},
   locations: {name:"Alpha Delta Phi Helping Home" , street:"506 E 7th St" , city:"Austin" , state:"TX" , zip:"78787", phone:"512-305-4106"},
   hours: {monday: "Open 24", tuesday: "Open 24", wednesday: "Open 24", thursday: "Open 24", friday: "Open 24", saturday: "Open 24", sunday: "Closed"}
};

var shelter10 = { shelters: {shelterName: "Emergency Night Shelter", shelterEmail: "email@email.com", shelterDayTimePhone:"512-555-5555", shelterEmergencyPhone:"512-555-5555"},
  organizations: {orgName: "Angels' Army"},
  locations: {name:"Popup Shelter on 7th", street:"505 E 7th St" , city:"Austin" , state:"TX" , zip:"78703", phone:"512-305-4105"},
  hours:{monday: "Open 7am to 3pm", tuesday: "Open 7am to 3pm", wednesday: "Open 7am to 3pm", thursday: "Open 7am to 3pm", friday: "Open 7am to 3pm", saturday: "Open 7am to 3pm", sunday: "Open 7am to 3pm"}
};

var shelter11 = { shelters: {shelterName: "Emergency Shelter for Women and Children", shelterEmail: "coldweathershelter@frontsteps.org", shelterDayTimePhone:"512-305-4233" , shelterEmergencyPhone:"512-555-5555"},
  organizations: {orgName: "Front Door"},
  locations:{name:"Bolder Building", street:"504 E 7th St" , city:"Austin" , state:"TX" , zip:"78704", phone:"512-305-4104"},
  hours: {monday: "Open 24", tuesday: "Open 24", wednesday: "Open 24", thursday: "Open 24", friday: "Open 24", saturday: "Open 24", sunday: "Open 24"}
};

var unit1 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 1' }, shelters: {shelterName: "Men's Emergency Night Shelter"}};
var unit2 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 2'}, shelters: {shelterName: "Men's Emergency Night Shelter"}};
var unit3 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 3' }, shelters: {shelterName: "Men's Emergency Night Shelter"}};
var unit4 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 4' }, shelters: {shelterName: "Men's Emergency Night Shelter"}};
var unit5 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 5' }, shelters: {shelterName: "Men's Emergency Night Shelter"}};
var unit6 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 1' }, shelters: {shelterName: "Men's Day Sleep"}};
var unit7 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 2' }, shelters: {shelterName: "Men's Day Sleep"}};
var unit8 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 3' }, shelters: {shelterName: "Men's Day Sleep"}};
var unit9 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 1' }, shelters: {shelterName: "Men's Cold Weather Shelter"}};
var unit10 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 2' }, shelters: {shelterName: "Men's Cold Weather Shelter"}};
var unit11 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 1' }, shelters: {shelterName: "Women's Emergency Night Shelter"}};
var unit12 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 2' }, shelters: {shelterName: "Women's Emergency Night Shelter"}};
var unit13 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 3' }, shelters: {shelterName: "Women's Emergency Night Shelter"}};
var unit14 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 4' }, shelters: {shelterName: "Women's Emergency Night Shelter"}};
var unit15 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 5' }, shelters: {shelterName: "Women's Emergency Night Shelter"}};
var unit16 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 6' }, shelters: {shelterName: "Women's Emergency Night Shelter"}};
var unit17 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 1' }, shelters: {shelterName: "Emergency Night Shelter"}};
var unit18 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 2' }, shelters: {shelterName: "Emergency Night Shelter"}};
var unit19 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 3' }, shelters: {shelterName: "Emergency Night Shelter"}};
var unit20 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 4' }, shelters: {shelterName: "Emergency Night Shelter"}};
var unit21 = {shelterUnit: {unitSize: "2BD", unitName: 'Room 1' }, shelters: {shelterName: "Emergency Night Shelter"}};
var unit22 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 2' }, shelters: {shelterName: "Emergency Night Shelter"}};
var unit23 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 1' }, shelters: {shelterName: "Emergency Shelter for Women and Children"}};
var unit24 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 2' }, shelters: {shelterName: "Emergency Shelter for Women and Children"}};
var unit25 = {shelterUnit: {unitSize: "1BD", unitName: 'Room 1' }, shelters: {shelterName: "Children's Cold Weather Shelter Program"}};

exports.seed = function(knex, Promise) {
var org1, org2, org3;
  return Promise.join(
    knex('eligibilityOptions')
      .insert([
          {eligibilityOption: "Age", eligibilityOptionDescription: "There is an age requirement for this shelter"}, 
          {eligibilityOption: "Household Size", eligibilityOptionDescription: "There is a household size requirement for this shelter"},
          {eligibilityOption: "Armed Forces", eligibilityOptionDescription:"There is an armed forces requirement for this shelter"},
          {eligibilityOption: "Ex-Offenders", eligibilityOptionDescription: "Must be ex-offender"}, 
          {eligibilityOption: "Health", eligibilityOptionDescription: "There is a health related requirement to qualify for this shelter"},
          {eligibilityOption: "Trauma Survivors", eligibilityOptionDescription: "There is a trauma related requirement to qualify for this shelter."}
      ])
      .returning('*')
      .catch(function(err){
        console.log("There was an error adding this eligibility", err);
        throw new Error("There was an error adding this eligibility", err);
      })
      .then(function(result){
        console.log("SUCCESS #1");
        ageID = result[0].eligibilityOptionID;
        houseSizeID = result[1].eligibilityOptionID;
        armedForcesID = result[2].eligibilityOptionID;
        exOffenderID =  result[3].eligibilityOptionID;
        healthID = result[4].eligibilityOptionID;
        traumaSurvivorID = result[5].eligibilityOptionID;
        return knex('eligibilityOptions')
              .insert([
                  {eligibilityOption: "Minors", eligibilityOptionDescription:"Must be younger than 18 years of age", fk_eligibilityParentID: ageID }, 
                  {eligibilityOption: "Adults", eligibilityOptionDescription:"Must be 18 years of age and older", fk_eligibilityParentID: ageID },
                  {eligibilityOption: "Active Duty", eligibilityOptionDescription: "Must be active duty.", fk_eligibilityParentID: armedForcesID },
                  {eligibilityOption: "Veterans", eligibilityOptionDescription: "Must be veterans.", fk_eligibilityParentID: armedForcesID },
                  {eligibilityOption: "Pregnancy", eligibilityOptionDescription: "Must be pregnant.", fk_eligibilityParentID: healthID },
                  {eligibilityOption: "Substance Dependency", eligibilityOptionDescription: "Must have active substance dependency", fk_eligibilityParentID: healthID },
                  {eligibilityOption: "Individuals", eligibilityOptionDescription: "Must be individual person (not families or groups)", fk_eligibilityParentID: houseSizeID },
                  {eligibilityOption: "Families", eligibilityOptionDescription: "Must be families with children", fk_eligibilityParentID: houseSizeID }, 
                  {eligibilityOption: "Domestic and Family Violence", eligibilityOptionDescription: "Must be survivor of domestic or family violence situation.", fk_eligibilityParentID: traumaSurvivorID },
                  {eligibilityOption: "Natural Disasters", eligibilityOptionDescription: "Must be a survivor of natural disaster", fk_eligibilityParentID: traumaSurvivorID },
                  {eligibilityOption: "Men", eligibilityOptionDescription: "There is a gender based requirement (men only) to qualify for this shelter."},
                  {eligibilityOption: "Women", eligibilityOptionDescription: "There is a gender based requirement (women only) to qualify for this shelter."}
              ])
              .returning('*');
        })
      .catch(function(err){
        console.log("There was an error adding this eligibility", err);
        throw new Error("There was an error adding this eligibility", err);
      })
    .then(function(eligOptions){
        console.log("SUCCESS #2");      
      minorsOptID = eligOptions[0].eligibilityOptionID;
      adultsOptID = eligOptions[1].eligibilityOptionID;
      substAddictOptID = eligOptions[6].eligibilityOptionID;
      vetsOptID = eligOptions[4].eligibilityOptionID;
      womenOptID = eligOptions[11].eligibilityOptionID;
      menOptID = eligOptions[10].eligibilityOptionID;
      //--userRoles
      return knex('userRoles')
            .insert([
              {userRoleName:"Anonymous", userRoleDescription: "Default anonymous user role for all nonregistered users."},
              {userRoleName:"Registered", userRoleDescription: "Registered users registered and logged in to site."},
              {userRoleName:"Admin", userRoleDescription: "Administrative users managing organizations."}, 
              {userRoleName:"Manager", userRoleDescription: "Administrative users managing shelters and real-time bed counts."}
            ])
            .returning('*');
    })
    .catch(function(err){
        console.log("There was an error adding this user role", err);
        throw new Error("There was an error adding this user role", err);     
    })

    .then(function(results){
        console.log("SUCCESS #3");       
      return knex('organizations')
            .insert([
                {organizationName: "Front Door"}, 
                {organizationName: "Angels' Army"}, 
                {organizationName: "Safe House"}, 
              ])
            .returning('*');
      })
      .catch(function(err){
        console.log("There was an error adding these organizations", err);
        throw new Error("There was an error adding these organizations", err);
      })
      .then(function(orgs){
       //insert all the shelters
       return Promise.all([
        shelterHelpers.insertShelter(shelter1),
        shelterHelpers.insertShelter(shelter2),
        shelterHelpers.insertShelter(shelter3),
        shelterHelpers.insertShelter(shelter4),
        shelterHelpers.insertShelter(shelter5),
        shelterHelpers.insertShelter(shelter6),
        shelterHelpers.insertShelter(shelter7),
        shelterHelpers.insertShelter(shelter8),
        shelterHelpers.insertShelter(shelter9),
        shelterHelpers.insertShelter(shelter10),
        shelterHelpers.insertShelter(shelter11)
      ]);
    })
    .catch(function(err){
      console.log("There was an error adding these shelters", err);
      throw new Error("There was an error adding these shelters", err);
    })
    .then(function(shelters){
        console.log("SUCCESS #4");
        //--shelterUnits
      return Promise.all([
            shelterHelpers.insertShelterUnit(unit1),
            shelterHelpers.insertShelterUnit(unit2),
            shelterHelpers.insertShelterUnit(unit3),
            shelterHelpers.insertShelterUnit(unit4),
            shelterHelpers.insertShelterUnit(unit5),
            shelterHelpers.insertShelterUnit(unit6),
            shelterHelpers.insertShelterUnit(unit7),
            shelterHelpers.insertShelterUnit(unit8),
            shelterHelpers.insertShelterUnit(unit9),
            shelterHelpers.insertShelterUnit(unit10),
            shelterHelpers.insertShelterUnit(unit11),
            shelterHelpers.insertShelterUnit(unit12),
            shelterHelpers.insertShelterUnit(unit13),
            shelterHelpers.insertShelterUnit(unit14),
            shelterHelpers.insertShelterUnit(unit15),
            shelterHelpers.insertShelterUnit(unit16),
            shelterHelpers.insertShelterUnit(unit17),
            shelterHelpers.insertShelterUnit(unit18),
            shelterHelpers.insertShelterUnit(unit19),
            shelterHelpers.insertShelterUnit(unit20),
            shelterHelpers.insertShelterUnit(unit21),
            shelterHelpers.insertShelterUnit(unit22),
            shelterHelpers.insertShelterUnit(unit23),
            shelterHelpers.insertShelterUnit(unit24),
            shelterHelpers.insertShelterUnit(unit25)
      ]);
    })
    .catch(function(err){
      console.log("There was an error adding these shelter units", err);
      throw new Error("There was an error adding these shelter units", err);
    })
    .then(function(units){
        console.log("SUCCESS #5");
        console.log('units', units)
        var unit1ID = units[0][0].shelterUnitID;
        var unit2ID = units[2][0].shelterUnitID;
        var unit3ID = units[8][0].shelterUnitID;
        var unit4ID = units[13][0].shelterUnitID;
        var unit5ID = units[5][0].shelterUnitID;
        var unit6ID = units[11][0].shelterUnitID;

        var occupant1 = {occupancy: {name: "OJ Simpson", entranceDate:'04/08/2015', exitDate:'04/14/2015', unitID: unit1ID}};
        var occupant2 = {occupancy: {name: "George Bush Sr.", entranceDate:'04/08/2015', exitDate:'04/14/2015', unitID: unit2ID}};
        var occupant3 = {occupancy: {name: "Zac Morris", entranceDate:'05/08/2015', exitDate:'05/14/2015', unitID: unit3ID}};
        var occupant4 = {occupancy: {name: "Prince", entranceDate:'02/08/2015', exitDate:'04/14/2015', unitID: unit4ID}};
        var occupant5 = {occupancy: {name: "Celine Dion", entranceDate:'03/08/2015', exitDate:'05/14/2015', unitID: unit5ID}};
        var occupant6 = {occupancy: {name: "Bart Simpson", entranceDate:'04/08/2015', exitDate:'04/14/2015', unitID: unit6ID}};

        //--shelterOccupancy
        return Promise.all([
          shelterHelpers.insertShelterOccupancy(occupant1),
          shelterHelpers.insertShelterOccupancy(occupant2),
          shelterHelpers.insertShelterOccupancy(occupant3),
          shelterHelpers.insertShelterOccupancy(occupant4),
          shelterHelpers.insertShelterOccupancy(occupant5),
          shelterHelpers.insertShelterOccupancy(occupant6)
        ]);
    })
     .catch(function(err){
      console.log("There was an error adding these occupancy records", err);
      throw new Error("There was an error adding these occupancy records", err);
    }) 
    .then(function(res){
      console.log('SUCCESS #6');
    })  
  );
};