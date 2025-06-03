const { exec } = require('child_process');
const path = require('path');

/**
 * Script simple para ejecutar tests de integración con la configuración correcta
 * Para estudiantes - fuerza el uso de config.test.yaml
 */

console.log('🧪 Iniciando tests de integración...');
console.log('📋 Usando configuración de test (puerto 3308)');

// Configurar variable de entorno para forzar config de test
process.env.NODE_ENV = 'test';

// Comando para ejecutar mocha con la configuración correcta
const testCommand = 'cross-env NODE_ENV=test mocha src/test/integration --exit --timeout 15000';

console.log('⚙️  Ejecutando comando:', testCommand);
console.log('');

// Ejecutar los tests
exec(testCommand, {
  cwd: path.join(__dirname, '..'),
  env: {
    ...process.env,
    NODE_ENV: 'test'
  }
}, (error, stdout, stderr) => {
  
  if (stdout) {
    console.log(stdout);
  }
  
  if (stderr && !stderr.includes('DeprecationWarning')) {
    console.error('⚠️  Errores:', stderr);
  }
  
  if (error) {
    console.error('❌ Tests fallaron');
    console.log('');
    console.log('💡 Verificaciones:');
    console.log('1. ¿BD test funcionando? npm run test-db-check');
    console.log('2. ¿Configuración correcta? Revisar config.test.yaml');
    console.log('3. ¿Variables entorno? NODE_ENV debe ser "test"');
    process.exit(1);
  } else {
    console.log('✅ Tests completados exitosamente!');
    process.exit(0);
  }
});