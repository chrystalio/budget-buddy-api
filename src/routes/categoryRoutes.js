const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Route to get all categories
router.get('/', categoryController.getAllCategories);

module.exports = router;
