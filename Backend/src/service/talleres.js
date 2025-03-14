//service/talleres.js
// Se encarga de manejar las operaciones CRUD relacionadas con los talleres

const db = require("../configuration/database");

// Obtener todas las obras de la base de datos
const findAllTalleres = async () => {
  try {
    // Realizar consulta a la base de datos
    const talleres = await db.select("*").from("talleres");
    return talleres;
  } catch (error) {
    console.error("Error al obtener talleres:", error);
    throw error;
  }
};

// Encontrar una obra específica por su ID
const findTaller = async (ID_taller) => {
  return await db("talleres").where("ID_taller", ID_taller).first();
};

// Registrar una nueva obra en la base de datos
const registerTaller = async (taller) => {
  try {
    return await db("talleres").insert(taller);
  } catch (error) {
    console.error("Error al registrar taller:", error);
    throw error;
  }
};

// Modificar una obra existente
const modifyTaller = async (ID_taller, taller) => {
  try {
    // Actualizar la obra en la base de datos
    const resultado = await db("talleres")
      .where("ID_taller", ID_taller)
      .update(taller);

    // Verificar si se actualizó algún registro
    if (resultado === 0) {
      throw new Error(`No se pudo actualizar el taller con ID ${ID_taller}`);
    }

    // Obtener y devolver la obra actualizada
    const tallerActualizado = await db("talleres")
      .where("ID_taller", ID_taller)
      .first();
    return tallerActualizado;
  } catch (error) {
    console.error("Error al modificar taller:", error);
    throw error;
  }
};

// Eliminar una obra de la base de datos
const removeTaller = async (ID_taller) => {
  return await db("talleres").where("ID_taller", ID_taller).del();
};

// Exportar todas las funciones del servicio
module.exports = {
  findAllTalleres,
  findTaller,
  registerTaller,
  modifyTaller,
  removeTaller,
};
