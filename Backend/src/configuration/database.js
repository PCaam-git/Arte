// Importar las dependencias necesarias
const knex = require('knex');           // Importar el constructor de Knex
const knexfile = require('./knexfile.js'); // Importar la configuración de la base de datos

// Determinar el entorno de ejecución
// Si no está definido NODE_ENV, usar 'development' por defecto
const environment = process.env.NODE_ENV || 'development';

// Obtener la configuración específica para el entorno actual
// knexfile contiene diferentes configuraciones para development, production, etc.
const config = knexfile[environment];

// Crear una instancia de conexión a la base de datos
// Esta instancia será utilizada en toda la aplicación
const db = knex(config);

// Exportar la instancia de la base de datos para su uso en otros módulos
module.exports = db;