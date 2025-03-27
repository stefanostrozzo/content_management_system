const express = require('express');
const router = express.Router();

//Import somme specific routes
const healthRoute = require('./healthRoute');

//Routes
router.use('/health', healthRoute);


module.exports = router;