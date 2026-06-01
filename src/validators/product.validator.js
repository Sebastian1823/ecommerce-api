const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede superar los 150 caracteres',
    'any.required': 'El campo name es requerido'
  }),
  description: Joi.string().trim().max(1000).optional().allow('').messages({
    'string.max': 'La descripción no puede superar los 1000 caracteres'
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.base': 'El precio debe ser un número',
    'number.positive': 'El precio debe ser mayor a 0',
    'any.required': 'El campo price es requerido'
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'El stock debe ser un número entero',
    'number.integer': 'El stock debe ser un número entero',
    'number.min': 'El stock no puede ser negativo',
    'any.required': 'El campo stock es requerido'
  })
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).messages({
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede superar los 150 caracteres'
  }),
  description: Joi.string().trim().max(1000).allow('').messages({
    'string.max': 'La descripción no puede superar los 1000 caracteres'
  }),
  price: Joi.number().positive().precision(2).messages({
    'number.base': 'El precio debe ser un número',
    'number.positive': 'El precio debe ser mayor a 0'
  }),
  stock: Joi.number().integer().min(0).messages({
    'number.base': 'El stock debe ser un número entero',
    'number.integer': 'El stock debe ser un número entero',
    'number.min': 'El stock no puede ser negativo'
  })
}).min(1).messages({
  'object.min': 'Debes enviar al menos un campo para actualizar'
});

module.exports = { createSchema, updateSchema };