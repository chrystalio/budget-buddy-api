const categoryService = require('../services/categoryService');

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

module.exports = {
    getAllCategories,
    getCategoryById,
};
