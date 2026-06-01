# Ecommerce API

API RESTful de ecommerce desarrollada con Node.js, Express.js y MySQL.

## Tecnologías

- Node.js
- Express.js
- MySQL (mysql2)
- Joi (validación)
- Axios (cliente HTTP)
- Lorem Picsum (imágenes automáticas)

## Instalación local

```bash
git clone https://github.com/Sebastian1823/ecommerce-api.git
cd ecommerce-api
npm install
```

Crear archivo `.env` basándose en `.env.example` y configurar las variables de entorno.

```bash
npm run dev
```

## URL en línea

```
TU_URL_RENDER
```

## Endpoints

### Obtener todos los productos

```bash
curl http://localhost:3000/api/products
```

### Obtener un producto por ID

```bash
curl http://localhost:3000/api/products/1
```

### Crear un producto

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop HP", "description": "Laptop de alto rendimiento", "price": 999.99, "stock": 10}'
```

### Actualizar un producto

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 899.99, "stock": 15}'
```

### Eliminar un producto

```bash
curl -X DELETE http://localhost:3000/api/products/1
```

### Probar conexión a la base de datos

```bash
curl http://localhost:3000/test-db
```
