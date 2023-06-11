const router = require("express").Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const authRoutes = require('./authRoutes');

//Open API
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API
router.use('/api/v1', authRoutes)

module.exports = router



