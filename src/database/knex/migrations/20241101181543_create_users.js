
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('userName').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('profileImage');
        table.timestamps(true, true);
    })
};


exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
