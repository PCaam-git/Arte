const { db } = require('../configuration/database');

const findAllObras = async () => {
  return await db.select('*').from('obras');
};

const findObra = async (id) => {
  return await db('obras').where('id', id).first();
};

const registerObra = async (obra) => {
  return await db('obras').insert(obra);
};

const modifyObra = async (id, obra) => {
  return await db('obras').where('id', id).update(obra);
};

const removeObra = async (id) => {
  return await db('obras').where('id', id).del();
};

module.exports = { findAllObras, findObra, registerObra, modifyObra, removeObra };