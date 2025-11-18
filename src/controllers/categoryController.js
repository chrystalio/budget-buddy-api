const categoryService = require('../services/categoryService');
const { ValidationError } = require('../middleware/errorMiddleware');

async function getAllCategories(req, res, next) {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
}

async function getCategoryById(req, res, next) {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Category not found',
                },
            });
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        next(error);
    }
}

async function createCategory(req, res, next) {
    try {
        const { name } = req.body;
        if (!name || !name.trim()) {
            throw new ValidationError('Category name is required and cannot be empty!');
        }

        const newCategory = await categoryService.createCategory({ name: name.trim() });
        return res.status(201).json({
            success: true,
            data: newCategory,
        });
    } catch (error) {
        next(error);
    }
}

async function updateCategory(req, res, next) {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        if (!name || !name.trim()) {
            throw new ValidationError('Category name is required and cannot be empty!');
        }
        const updatedCategory = await categoryService.updateCategory(categoryId, { name: name.trim() });
        res.status(200).json({
            success: true,
            data: updatedCategory,
        });
    } catch (error) {
        next(error);
    }
}

async function deleteCategory(req, res, next) {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categoryService.deleteCategory(categoryId);
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            data: deletedCategory,
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
