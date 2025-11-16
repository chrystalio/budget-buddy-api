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

module.exports = {
    getAllCategories,
};
