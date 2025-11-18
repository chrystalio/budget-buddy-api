const categoryRepository = require('../repositories/categoryRepository');

async function getAllCategories() {
    const categories = await categoryRepository.findAll();
    return categories;
}

async function getCategoryById(id) {
    const category = await categoryRepository.findById(id);
    return category;
}

async function createCategory(data) {
    const category = await categoryRepository.create(data);
    return category;
}

async function updateCategory(id, data) {
    const category = await categoryRepository.update(id, data);
    return category;
}

async function deleteCategory(id) {
    const category = await categoryRepository.delete(id);
    return category;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
