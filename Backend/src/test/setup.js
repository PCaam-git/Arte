// Mock de la configuración para tests
jest.mock('../configuration/configuration', () => ({
  config: {
    db: {
      client: 'sqlite3',
      filename: ':memory:'
    },
    service: {
      port: 8090
    }
  }
}));

// Mock de la base de datos
jest.mock('../configuration/database', () => ({
  select: jest.fn(),
  from: jest.fn(),
  where: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  del: jest.fn()
}));