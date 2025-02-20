const db = require("../configuration/database");

// Obtener todas las obras de la base de datos
const findAllObras = async () => {
 try {
   // Realizar consulta a la base de datos
   const obras = await db.select("*").from("obras");
   return obras;
 } catch (error) {
   console.error("Error al obtener obras:", error);
   throw error;
 }
};

// Encontrar una obra específica por su ID
const findObra = async (ID_obra) => {
 return await db("obras").where("ID_obra", ID_obra).first();
};

// Registrar una nueva obra en la base de datos
const registerObra = async (obra) => {
 return await db("obras").insert(obra);
};

// Modificar una obra existente
const modifyObra = async (ID_obra, obra) => {
 try {
   // Actualizar la obra en la base de datos
   const resultado = await db("obras").where("ID_obra", ID_obra).update(obra);

   // Verificar si se actualizó algún registro
   if (resultado === 0) {
     throw new Error(`No se pudo actualizar la obra con ID ${ID_obra}`);
   }

   // Obtener y devolver la obra actualizada
   const obraActualizada = await db("obras").where("ID_obra", ID_obra).first();
   return obraActualizada;
 } catch (error) {
   console.error("Error al modificar obra:", error);
   throw error;
 }
};

// Eliminar una obra de la base de datos
const removeObra = async (ID_obra) => {
 return await db("obras").where("ID_obra", ID_obra).del();
};

// Exportar todas las funciones del servicio
module.exports = {
 findAllObras,
 findObra,
 registerObra,
 modifyObra,
 removeObra,
};