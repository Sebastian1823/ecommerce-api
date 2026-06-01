const { pool } = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

const create = async (name, description, price, stock, image_url) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, stock, image_url]
  );
  return { id: result.insertId, name, description, price, stock, image_url };
};

const update = async (id, fields) => {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  await pool.query(`UPDATE products SET ${setClause} WHERE id = ?`, [...values, id]);
  return getById(id);
};

const remove = async (id) => {
  const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = { getAll, getById, create, update, remove };
