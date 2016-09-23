
var mysqlAdapter = require('sails-mysql');

module.exports = {

  // Setup Adapters
  // Creates named adapters that have been required
  adapters: {
    'default': mysqlAdapter,
    db2: {
        module   : 'sails-db2',
        host     : 'localhost',
        port     : 50000,
        user     : 'db2Admin',
        password : '123456789',
        database : 'Sample',
        schemaDB2: 'my_schema'
    },
    mysql: mysqlAdapter
  },

  // Build Connections Config
  // Setup connections using the named adapter configs
  connections: {
    db2Connection: {
      adapter: 'db2'
    },

    mySqlConnection: {
      adapter: 'mysql',
      host: 'localhost',
      database: 'foobar'
    }
  },

  defaults: {
    migrate: 'alter'
  }

};