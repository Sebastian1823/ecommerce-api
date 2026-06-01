const Product = require('../models/product.model');
const { createSchema, updateSchema } = require('../validators/product.validator');
const { fetchProductImage } = require('../services/externalApi.service');

const getAll = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.json({ success: true, data: products, message: 'Productos obtenidos correctamente' });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      return next(error);
    }
    res.json({ success: true, data: product, message: 'Producto obtenido correctamente' });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { error, value } = createSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.isJoi = true;
      return next(error);
    }

    const image_url = await fetchProductImage(value.name);
    const product = await Product.create(
      value.name,
      value.description || null,
      value.price,
      value.stock,
      image_url
    );

    res.status(201).json({ success: true, data: product, message: 'Producto creado correctamente' });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { error, value } = updateSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.isJoi = true;
      return next(error);
    }

    const existing = await Product.getById(req.params.id);
    if (!existing) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      return next(err);
    }

    const product = await Product.update(req.params.id, value);
    res.json({ success: true, data: product, message: 'Producto actualizado correctamente' });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const existing = await Product.getById(req.params.id);
    if (!existing) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      return next(err);
    }

    await Product.remove(req.params.id);
    res.json({ success: true, data: null, message: 'Producto eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
