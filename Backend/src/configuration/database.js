const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './arte.db' 
  },
  useNullAsDefault: true
});

exports.db = db;