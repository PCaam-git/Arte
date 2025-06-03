-- Script de inicialización completo para base de datos de test

-- Crear tabla disciplinas
CREATE TABLE IF NOT EXISTS disciplinas (
    ID_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Crear tabla subdisciplinas  
CREATE TABLE IF NOT EXISTS subdisciplinas (
    ID_subdisciplina INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ID_disciplina INT NOT NULL,
    FOREIGN KEY (ID_disciplina) REFERENCES disciplinas(ID_disciplina)
);

-- Crear tabla obras
CREATE TABLE IF NOT EXISTS obras (
    ID_obra INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    fecha_creacion DATE,
    precio DECIMAL(10,2),
    imagen VARCHAR(255),
    ID_subdisciplina INT NOT NULL,
    ID_disciplina INT NOT NULL,
    FOREIGN KEY (ID_subdisciplina) REFERENCES subdisciplinas(ID_subdisciplina),
    FOREIGN KEY (ID_disciplina) REFERENCES disciplinas(ID_disciplina)
);

-- Crear tabla talleres
CREATE TABLE IF NOT EXISTS talleres (
    ID_taller INT AUTO_INCREMENT PRIMARY KEY,
    tematica VARCHAR(200) NOT NULL,
    fecha DATE,
    lugar VARCHAR(200),
    descripcion TEXT,
    imagen VARCHAR(255)
);

-- Insertar las 3 disciplinas
INSERT INTO disciplinas (ID_disciplina, nombre) VALUES 
(1, 'Lienzo'),
(2, 'Escultura'),
(3, 'Cerámica');

-- Insertar las 9 subdisciplinas
INSERT INTO subdisciplinas (ID_subdisciplina, nombre, ID_disciplina) VALUES 
(1, 'Acrílico', 1),
(2, 'Óleo', 1),
(3, 'Acuarela', 1),
(4, 'Arcilla', 2),
(5, 'Hormigón', 2),
(6, 'Metal', 2),
(7, 'Bustos', 3),
(8, 'Jarrones', 3),
(9, 'Vajilla', 3);

-- Insertar las 3 obras para tests
INSERT INTO obras (ID_obra, descripcion, fecha_creacion, precio, imagen, ID_subdisciplina, ID_disciplina) VALUES 
(5, 'Obra de prueba 1', '2024-01-15', 150.00, 'test1.jpg', 1, 1),
(6, 'Obra de prueba 2', '2024-02-20', 200.00, 'test2.jpg', 2, 1),
(8, 'Obra de prueba 3', '2024-03-10', 300.00, 'test3.jpg', 4, 2);

-- Insertar los 2 talleres para tests
INSERT INTO talleres (ID_taller, tematica, fecha, lugar, descripcion, imagen) VALUES 
(1, 'Taller de Acrílico', '2024-06-15', 'Aula 101', 'Taller básico de pintura acrílica', 'taller1.jpg'),
(2, 'Taller de Escultura', '2024-07-20', 'Taller Arte', 'Introducción a la escultura en arcilla', 'taller2.jpg');