const categoryRepository = require('../repositories/categoryRepository');

async function getAllCategories() {
    const categories = await categoryRepository.findAll();
    return categories;
}

async function getCategoryById(id) {
    const category = await categoryRepository.findById(id);
    return category;
}

module.exports = {
    getAllCategories,
    getCategoryById,
};
