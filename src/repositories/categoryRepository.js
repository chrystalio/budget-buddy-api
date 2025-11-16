const { NotFoundError, NotionApiError } = require('../middleware/errorMiddleware');
const notion = require('./notionClient');
const config = require('../config/index');


const mapNotionPageToCategory = (page) => {
    const id = page.id;
    const name = page.properties.Name.title[0]?.plain_text || 'Unnamed Category';
    const categoryId = page.properties['Category ID'].rich_text[0]?.plain_text || null;

    return {
        id,
        name,
        categoryId,
    };
}

async function findAll() {
    try {
        const response = await notion.databases.query({
            database_id: config.notionDatabases.categories
        });

        return response.results.map(mapNotionPageToCategory);
    } catch (error) {
        throw new NotionApiError(`Failed to fetch categories from Notion: ${error.message}`);
    }
}

async function findById(id) {
    try {
        const response = await notion.pages.retrieve({ page_id: id });
        return mapNotionPageToCategory(response);
    } catch (error) {
        if (error.code === 'object_not_found') {
            throw new NotFoundError(`Category with ID ${id} not found`);
        }
        if (error.code === 'validation_error') {
            throw new NotionApiError(`Invalid category ID format: ${id}`);
        }
        throw new NotionApiError(`Failed to fetch category: ${error.message}`);
    }
}

/**
 * Generate the next sequential category ID
 * Format: CAT-001, CAT-002, CAT-003, etc.
 * @returns {Promise<string>} Next category ID
 */
async function generateNextCategoryId() {
    const allCategories = await findAll();

    // Find the highest existing category number
    let maxNumber = 0;

    for (const category of allCategories) {
        if (category.categoryId) {
            // Extract number from format "CAT-001"
            const match = category.categoryId.match(/CAT-(\d+)/);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxNumber) {
                    maxNumber = num;
                }
            }
        }
    }

    // Generate next ID with zero-padding (CAT-001, CAT-002, etc.)
    const nextNumber = maxNumber + 1;
    return `CAT-${String(nextNumber).padStart(3, '0')}`;
}

/**
 * Create new category with auto-generated ID
 * @param {Object} data - Category data { name: string }
 * @returns {Promise<Object>} Created category
 */
async function create(data) {
    try {
        // Auto-generate sequential category ID
        const categoryId = await generateNextCategoryId();

        const properties = {
            Name: {
                title: [{ text: { content: data.name } }]
            },
            'Category ID': {
                rich_text: [{ text: { content: categoryId } }]
            }
        };

        const response = await notion.pages.create({
            parent: { database_id: config.notionDatabases.categories },
            properties
        });

        return mapNotionPageToCategory(response);
    } catch (error) {
        throw new NotionApiError(`Failed to create category: ${error.message}`);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    mapNotionPageToCategory,
};
