const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().optional().allow(''),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required()
});

const updateSchema = Joi.object({
  name: Joi.string().min(2),
  description: Joi.string().allow(''),
  price: Joi.number().positive(),
  stock: Joi.number().integer().min(0)
}).min(1);

module.exports = { createSchema, updateSchema };
