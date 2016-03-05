require('../test-helper.js');
var request = require('supertest-as-promised');

var orgRecs = require(__server + '/dbHelpers/organizations');
var shelterRecs = require(__server + '/dbHelpers/shelters');
var locRecs = require(__server + '/dbHelpers/locations');
var userRecs = require(__server + '/dbHelpers/users');
var db = require(__db + '/db.js');


describe('Organization DB Calls', function(){
  var app = TestHelper.createApp();
  app.testReady();

  after(function(){
    db.deleteEverything();
  });

  beforeEach(function(){

  });
  //response should have just ID
  it('should insert organizations', function(){
    var org = {organizations: {orgName: 'FrontSteps'}};

    return orgRecs.insertOrganization(org)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].organizationID).to.not.equal('undefined');

                var orgId = resp[0].organizationID;
              });
  });

  it('should fetch organizations', function(){
    return orgRecs.selectOrganization(org)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].organizationID).to.not(orgId);
      });
  });


  it('should delete organizations', function(){
    return orgRecs.deleteOrganization(org)
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].organizationName).to.equal('FrontSteps');
                  });
  });

  it('should not fetch deleted Organizations', function(){
    return shelterRecs.selectOrganization(org)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp.length).to.have.length(0);
      });
  });
});



describe('Shelter and eligibility DB calls', function(){
  var app = TestHelper.createApp();
  app.testReady();

  before(function(){
    var orgId = orgRecs.insertOrganization({organizations: {organizationName: 'FrontSteps'}});
    var eligibilityID = eligRecs.selectEligibilityOption({eligibility: {eligibilityOption: 'Vets'}});
  });

  after(function(){
    db.deleteEverything();
  });

it('should insert Shelters', function(){
    var shelter = {shelters:
      {shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'}
    };
    var shelterName = {shelters: shelter.shelters.shelterName};

    return shelterRecs.insertShelter(shelter)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].shelterID).to.not.equal('undefined');
                expect(resp[0].shelterName).to.equal('Arches');
                expect(resp[0].shelterEmail).to.equal('example@example.com');


                var shelterId = resp[0].shelterID;
              });
  });

  it('should fetch Shelters', function(){
    return shelterRecs.selectShelter(shelterName)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].shelterID).to.equal(shelterId);
                expect(resp[0].shelterName).to.equal('Arches');
      });
  });

  it('should insert Shelter units', function(){
      var unit = {shelterUnit: {unitSize: '2BD'}};
      return shelterRecs.insertShelterUnit(unit, shelterId)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].unitSize).to.equal('2BD');

                var unitId = resp[0].shelterUnitID;
              });
  });

  it('should insert Shelter eligibility', function(){
    var eligibility = {eligibility: {eligibilityOption: 'Vets'}};
    return shelterRecs.insertShelterEligibility(eligibility, shelterId)
            .then(function(resp){
              expect(resp).to.be.an.instanceOf(Array);
              expect(resp).to.have.length(1);
              expect(resp[0].fk_eligibilityOptionID).to.equal(eligibilityID);
            });
  });

  it('should insert shelter occupancy', function(){
    var occupant = {occupancy: {name: 'John Smith', unitSize: '2BD'}};
    return shelterRecs.insertShelterOccupancy(occupant, shelterId)
                        .then(function(resp){
                          expect(resp).to.have.length(1);
                          expect(resp[0].occupiedByName).to.equal('John Smith');

                          var occupancyId = resp[0].occupancyID;
                        });
  });

  it('should update shelter occupancy', function(){
    var updateOccupancy = {occupancy: {name: 'Jimmy McGoo'}};

    return shelterRecs.updateShelterOccupancy(updateOccupancy, occupancyId)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
                    });
  });

  it('should fetch shelter occupancy', function(){
    //should be passed just the shelterId directly
    shelterRecs.insertShelterOccupancy(unit);
    shelterRecs.insertShelterUnit(occupant);
    return shelterRecs.selectShelterOccupancy(shelterId)
                      .then(function(resp){
                        expect(resp).to.be.an.instanceOf(Array);
                        expect(resp).to.have.length(2);
                        expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
                        expect(resp[1].occupiedByName).to.equal('John Smith');
                      });
  });

  it('should delete shelter occupancy', function(){
    //just req should have the name of the person occuping the unit
    var occupied = {occupancy: {name: 'Jimmy McGoo'}};
    return shelterRecs.deleteShelterOccupancy(occupied)
                      .then(function(resp){
                        expect(resp).to.have.length(1);
                        expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
                      });
  });

  it('should not fetch deleted occupancy', function(){
      return shelterRecs.selectShelterOccupancy(shelterId)
                        .then(function(resp){
                          expect(resp).to.have.length(1);
                          expect(resp[0].occupiedByName).to.not.equal('Jimmy McGoo');
                        });

  });

  it('should delete shelter eligibility', function(){
    return shelterRecs.deleteShelterEligibility(eligibilityID)
                      .then(function(resp){
                        expect(resp).to.have.length(1);
                        expect(resp[0].eligibilityID).to.equal(eligibilityID);
                      });
  });

  // module.exports.deleteShelterUnit = function(req, shelterUnitID){
//   //function for deleting specific shelter unit
// }
  it('should delete shelter units', function(){
    return shelterRecs.deleteShelterUnit(unitId)
                  .then(function(resp){
                    expect(resp).to.have.length(1);
                    expect(resp[0].shelterUnitID).to.equal(unitId);
                  });
  });

  it('should delete Shelters', function(){
    return shelterRecs.deleteShelter(org)
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].shelterName).to.equal('Arches');
                  });
  });

  it('should not fetch deleted Shelters', function(){
    return shelterRecs.selectShelter(shelterName)
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(0);
      });
  });
});

describe('users DB calls', function(){
  var app = TestHelper.createApp();
  app.testReady();

  after(function(){
    db.deleteEverything();
  });  

  it('should create new public users', function(){
    var publicUser = {pubUser: {firstName: 'Joe', lastname: 'Schmoe', password: 'longencryptedstring'}};
    return userRecs.addNewPublic(publicUser)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].firstName).to.equal('Joe');
                      expect(resp[0].userID).to.not.equal(undefined);

                      var publicUserId = resp[0].userID;
                    });
  });

  xit('should create new admins for new organizations', function(){
    var adminUser = {adminUser: {firstName: 'Billy', lastname: 'the kid', password: 'anotherlongstring', }};

  });

  xit('should allow admin users to be associated with existing organizations', function(){
  });

  xit('should allow users to update passwords', function(){

  });

  xit('should allow users to update contact information', function(){

  });

  xit('should find users by userID', function(){

  });

  xit('should find users by email', function(){

  });

  xit('should allow admins to update shelter info', function(){
    //occupancy, eligibility, hours etc
  });

  xit('should be able to return users role', function(){

  });

  xit('should not allow public users to change shelter info', function(){

  });


});
