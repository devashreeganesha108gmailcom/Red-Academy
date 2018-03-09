
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('todolist', function (table) {
        table.increments('id').primary(); 
        //table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        //table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('task').notNullable();
        table.boolean('checked');
    })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('todolist')
};
