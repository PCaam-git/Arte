const mysql = require('mysql2');

/**
 * Script simple para verificar si MariaDB está listo
 * Para estudiantes - fácil de entender
 */

// Configuración simple de la BD de test
const config = {
  host: 'localhost',
  port: 3308,
  user: 'testuser',
  password: 'testpass',
  database: 'arte_test'
};

console.log('🔍 Verificando conexión a MariaDB...');
console.log(`📍 Conectando a: ${config.host}:${config.port}/${config.database}`);

// Crear conexión
const connection = mysql.createConnection(config);

// Intentar conectar
connection.connect((error) => {
  if (error) {
    console.log('❌ No se puede conectar a la base de datos');
    console.log('💡 Posibles soluciones:');
    console.log('   1. Ejecutar: npm run test-db-up');
    console.log('   2. Esperar 10-15 segundos más');
    console.log('   3. Verificar Docker: docker ps');
    console.log('   4. Ver logs: npm run test-db-logs');
    console.log('');
    console.log('🔧 Error técnico:', error.code || error.message);
    process.exit(1);
  }

  console.log('✅ ¡Conexión exitosa!');
  console.log('🎉 MariaDB está listo para los tests');
  console.log('');
  console.log('▶️  Ahora puedes ejecutar:');
  console.log('   npm run integration-test-with-env');
  console.log('');

  // Cerrar conexión
  connection.end();
  process.exit(0);
});