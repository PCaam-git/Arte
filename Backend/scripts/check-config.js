const path = require('path');

/**
 * Script simple para verificar qué configuración se está cargando
 * Para estudiantes - debug de configuración
 */

console.log('🔍 Verificando configuración de la aplicación...');
console.log('');

// Simular carga de configuración como en la app
process.env.NODE_ENV = 'test';
console.log('🧪 NODE_ENV configurado como:', process.env.NODE_ENV);

try {
  // Intentar cargar el módulo de configuración
  const configPath = path.join(__dirname, '../src/configuration/configuration.js');
  console.log('📁 Archivo configuración:', configPath);
  
  // Limpiar cache de require para forzar recarga
  delete require.cache[require.resolve(configPath)];
  
  const configuration = require(configPath);
  
  console.log('✅ Configuración cargada exitosamente');
  console.log('');
  console.log('📋 Detalles de configuración:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- Puerto servidor:', configuration.server?.port || 'No definido');
  console.log('- Host BD:', configuration.database?.connection?.host || 'No definido');
  console.log('- Puerto BD:', configuration.database?.connection?.port || 'No definido');
  console.log('- Usuario BD:', configuration.database?.connection?.user || 'No definido');
  console.log('- Base de datos:', configuration.database?.connection?.database || 'No definido');
  console.log('');
  
  // Verificar si es la configuración correcta para tests
  const expectedPort = 3308;
  const actualPort = configuration.database?.connection?.port;
  
  if (actualPort === expectedPort) {
    console.log('✅ ¡Configuración correcta! Usando puerto', expectedPort);
  } else {
    console.log('❌ Configuración incorrecta');
    console.log(`   Esperado puerto: ${expectedPort}`);
    console.log(`   Puerto actual: ${actualPort}`);
    console.log('');
    console.log('💡 Soluciones:');
    console.log('1. Verificar que config.test.yaml existe');
    console.log('2. Verificar que NODE_ENV=test');
    console.log('3. Revisar src/configuration/configuration.js');
  }
  
} catch (error) {
  console.error('❌ Error cargando configuración:', error.message);
  console.log('');
  console.log('💡 Verificar:');
  console.log('1. Archivo src/configuration/configuration.js existe');
  console.log('2. Archivo config.test.yaml existe');
  console.log('3. Sintaxis YAML correcta');
}