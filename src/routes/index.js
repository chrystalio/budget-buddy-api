const express = require('express');
const categoryRoutes = require('./categoryRoutes');

const router = express.Router();

// Route to get all categories
router.use('/categories', categoryRoutes);

module.exports = router;
