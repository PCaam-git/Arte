const { exec } = require('child_process');

/**
 * Script simple para recrear completamente la BD de test
 * Para estudiantes - soluciona problemas de foreign keys
 */

console.log('🔄 Recreando base de datos de test...');

// Función para ejecutar comandos
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function resetTestDatabase() {
  try {
    console.log('1️⃣ Bajando contenedor actual...');
    await runCommand('docker-compose -f docker-compose.test.yaml down -v');
    
    console.log('2️⃣ Esperando 3 segundos...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('3️⃣ Levantando contenedor nuevo...');
    await runCommand('docker-compose -f docker-compose.test.yaml up -d');
    
    console.log('4️⃣ Esperando 15 segundos para que MariaDB inicie...');
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    console.log('✅ Base de datos recreada!');
    console.log('');
    console.log('🔍 Ahora verifica con: npm run test-db-check');
    console.log('📊 Si funciona, ejecuta: npm run integration-test');
    
  } catch (error) {
    console.error('❌ Error recreando base de datos:', error.error?.message || error.message);
    console.log('');
    console.log('💡 Soluciones:');
    console.log('1. Verificar que Docker esté corriendo');
    console.log('2. Ejecutar manualmente:');
    console.log('   npm run test-db-down');
    console.log('   npm run test-db-up');
    console.log('3. Ver logs: npm run test-db-logs');
  }
}

// Ejecutar script
resetTestDatabase();