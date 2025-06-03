const path = require('path');
const configuration = require('./configuration');

/**
 * Configuración Knex corregida - compatible con config.test.yaml
 */

const getDbConfig = () => {
  // Verificar que existe la configuración de database
  if (!configuration.database) {
    console.error('❌ No se encontró configuración.database');
    throw new Error('Configuración de database no encontrada');
  }

  const dbConfig = configuration.database;
  
  // Si la configuración especifica SQLite
  if (dbConfig.client === 'sqlite3') {
    console.log('📁 Configurando SQLite');
    return {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, 'arte.db')
      },
      useNullAsDefault: true,
      pool: {
        afterCreate: (conn, cb) => {
          conn.run('PRAGMA foreign_keys = ON', cb);
        }
      }
    };
  } else {
    // Configuración MariaDB - usar dbConfig.connection
    console.log('🐳 Configurando MariaDB:', `${dbConfig.connection.host}:${dbConfig.connection.port}`);
    return {
      client: 'mysql2',
      connection: {
        host: dbConfig.connection.host,
        port: dbConfig.connection.port,
        user: dbConfig.connection.user,
        password: dbConfig.connection.password,
        database: dbConfig.connection.database
      },
      useNullAsDefault: true
    };
  }
};

module.exports = {
  development: getDbConfig(),
  test: getDbConfig(),
  production: getDbConfig()
};