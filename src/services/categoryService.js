const categoryRepository = require('../repositories/categoryRepository');

async function getAllCategories() {
    const categories = await categoryRepository.findAll();
    return categories;
}

module.exports = {
    getAllCategories,
};
