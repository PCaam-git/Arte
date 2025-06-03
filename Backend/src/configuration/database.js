// Importar las dependencias necesarias
const knex = require('knex');           // Importar el constructor de Knex
const knexfile = require('./knexfile.js'); // Importar la configuración de la base de datos

// Determinar el entorno de ejecución
// Si no está definido NODE_ENV, usar 'development' por defecto
const environment = process.env.NODE_ENV || 'development';

console.log(`🔧 Entorno detectado: ${environment}`);

// Obtener la configuración específica para el entorno actual
// knexfile contiene diferentes configuraciones para development, test, production, etc.
const config = knexfile[environment];

if (!config) {
  console.error(`❌ No se encontró configuración para entorno: ${environment}`);
  throw new Error(`Configuración Knex no encontrada para entorno: ${environment}`);
}

console.log('✅ Configuración Knex cargada correctamente');

// Crear una instancia de conexión a la base de datos
// Esta instancia será utilizada en toda la aplicación
const db = knex(config);

// Exportar la instancia de la base de datos para su uso en otros módulos
module.exports = db;