const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const yargs = require('yargs');

/**
 * Configuración simple para estudiantes
 * Carga archivos YAML de configuración según el entorno
 */

function loadConfiguration() {
  // Determinar qué archivo de configuración usar
  let configFile = 'config.local.yaml'; // Por defecto
  
  // 1. Verificar argument de línea de comandos --config
  const argv = yargs.argv;
  if (argv.config) {
    configFile = argv.config;
    console.log(`📁 Usando configuración desde argumento: ${configFile}`);
  }
  // 2. Verificar variable de entorno NODE_ENV
  else if (process.env.NODE_ENV === 'test') {
    configFile = 'config.test.yaml';
    console.log(`🧪 Entorno TEST detectado, usando: ${configFile}`);
  }
  else if (process.env.NODE_ENV === 'development') {
    configFile = 'config.dev.yaml';
    console.log(`🔧 Entorno DEVELOPMENT detectado, usando: ${configFile}`);
  }
  else {
    console.log(`📁 Usando configuración por defecto: ${configFile}`);
  }
  
  // Ruta del archivo de configuración (en la raíz del proyecto)
  const configPath = path.join(__dirname, '../../', configFile);
  
  console.log(`📋 Cargando configuración desde: ${configPath}`);
  
  // Verificar que el archivo existe
  if (!fs.existsSync(configPath)) {
    console.error(`❌ Archivo de configuración no encontrado: ${configPath}`);
    console.error('💡 Archivos disponibles:');
    const rootDir = path.join(__dirname, '../../');
    const files = fs.readdirSync(rootDir).filter(f => f.includes('config') && f.endsWith('.yaml'));
    files.forEach(f => console.error(`   - ${f}`));
    throw new Error(`Archivo de configuración no encontrado: ${configFile}`);
  }
  
  try {
    // Leer y parsear el archivo YAML
    const fileContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(fileContent);
    
    if (!config) {
      throw new Error('Configuración vacía o inválida');
    }
    
    console.log('✅ Configuración cargada exitosamente');
    console.log(`📊 Puerto BD: ${config.database?.connection?.port || 'No definido'}`);
    console.log(`📊 Base de datos: ${config.database?.connection?.database || 'No definido'}`);
    
    return config;
    
  } catch (error) {
    console.error(`❌ Error cargando configuración: ${error.message}`);
    throw error;
  }
}

// Cargar y exportar la configuración
let configuration;

try {
  configuration = loadConfiguration();
} catch (error) {
  console.error('💥 Error fatal cargando configuración:', error.message);
  process.exit(1);
}

module.exports = configuration;