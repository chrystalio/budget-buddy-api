const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Route to get all categories
router.get('/', categoryController.getAllCategories);
// Route to get a category by ID
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
