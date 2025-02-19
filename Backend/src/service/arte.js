const db = require("../configuration/database");

/*const findAllObras = async () => {
  return await db.select('*').from('obras');
};*/

const findAllObras = async () => {
  const obras = await db.select("*").from("obras");
  try {
    console.log("📌 Intentando conectar a la base de datos...");
    const obras = await db.select("*").from("obras");
    console.log("✅ Conexión exitosa, obras encontradas:", obras);
    return obras;
  } catch (error) {
    console.error("❌ Error en la base de datos:", error);
    throw error;
  }

  /*console.log("📌 Datos extraídos de la base de datos:", obras);*/ // <-- Agregar esta línea para depuración

  return obras;
};

const findObra = async (ID_obra) => {
  return await db("obras").where("ID_obra", ID_obra).first();
};

const registerObra = async (obra) => {
  return await db("obras").insert(obra);
};

const modifyObra = async (ID_obra, obra) => {
  return await db("obras").where("ID_obra", ID_obra).update(obra);
};

const removeObra = async (ID_obra) => {
  return await db("obras").where("ID_obra", ID_obra).del();
};

module.exports = {
  findAllObras,
  findObra,
  registerObra,
  modifyObra,
  removeObra,
};
