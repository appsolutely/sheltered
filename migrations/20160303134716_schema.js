
exports.up = function(knex, Promise) {
  return Promise.all([

  knex.schema.createTable('userRoles', function(table){
    table.increments('userRoleID').primary();

    table.string('userRoleName');
    table.string('userRoleDescription');
  }),

  knex.schema.createTable('users', function(table){
    table.increments('userID').primary();

    table.string('userFirstName').notNullable();
    table.string('userLastName').notNullable();
    table.string('userPassword').notNullable();
    table.dateTime('userDOB').notNullable();
    table.string('userEmail').unique();
    table.integer('fk_userRole').notNullable() 
    			.references('userRoleID')
    			.inTable('userRoles');
  }),

  knex.schema.createTable('shelterManagers', function(table){
    table.increments('managerID').primary();
    table.integer('managerPhone').notNullable();
    table.integer('fk_shelterID').notNullable() 
    			.references('shelterID')
    			.inTable('shelters');
    table.integer('fk_userID').notNullable() 
    			.references('userID')
    			.inTable('users');
    table.string('managerEmail').notNullable();
  }),

  knex.schema.createTable('organizations', function(table){
    table.increments('organizationID').primary();

    table.string('organizationName').notNullable();
  }),

  knex.schema.createTable('shelters', function(table){
    table.increments('shelterID').primary();

    table.integer('fk_organizationID').notNullable() 
    			.references('organizationID')
    			.inTable('organizations');
    table.string('shelterName').notNullable();
    table.string('shelterLatLong');
    table.string('shelterEmail').notNullable();
    table.string('shelterEmergencyPhone').notNullable();
    table.string('shelterDaytimePhone').notNullable();
    table.string('shelterAddress').notNullable();
  }),

  knex.schema.createTable('shelterUnits', function(table){
    table.increments('shelterUnitID').primary();
    table.integer('fk_shelterID').notNullable() 
    			.references('shelterID')
    			.inTable('shelters');
    table.string('unitSize').notNullable().defaultTo('1BD');
  }),

  knex.schema.createTable('shelterOccupancy', function(table){
    table.increments('occupancyID').primary();

    table.integer('fk_shelterUnitID').notNullable() 
    			.references('shelterUnitID')
    			.inTable('shelterUnits');
    table.integer('fk_userID').notNullable() 
    			.references('userID')
    			.inTable('users');
    table.unique(['fk_shelterUnitID', 'fk_userID']);
  }),

  knex.schema.createTable('userSessions', function(table){
    table.uuid('sessionId').primary(); 
    table.integer('fk_userID').notNullable() 
    			.references('userID')
    			.inTable('users');
  }),

  knex.schema.createTable('eligibilityOptions', function(table){
    table.increments('eligibilityOptionID').primary();

    table.string('eligibilityOption').notNullable().unique();
    table.string('eligibilityOptionDescription').notNullable();
    table.integer('fk_eligibilityParentID')
          .references('eligibilityOptionID')
          .inTable('eligibilityOptions')
          .nullable();
  }),

  knex.schema.createTable('shelterEligibility', function(table){
    table.increments('shelterEligibilityID').primary();

    table.integer('fk_shelterID')
          .references('shelterID')
          .inTable('shelters')
          .notNullable();
    table.integer('fk_eligibilityOptionID')
          .references('eligibilityOptionID')
          .inTable('eligibilityOptions')
          .notNullable();
    table.unique(['fk_shelterID', 'fk_eligibilityOptionID']);
  })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('userRoles'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('shelterManagers'),
    knex.schema.dropTable('organizations'),
    knex.schema.dropTable('shelters'),
    knex.schema.dropTable('shelterUnits'),
    knex.schema.dropTable('shelterOccupancy'),
    knex.schema.dropTable('userSessions')
  ]);
};
