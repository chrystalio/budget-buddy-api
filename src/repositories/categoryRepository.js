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

        const results = response.results;
        const categories = results.map(mapNotionPageToCategory);
        return categories;
    } catch (error) {
        throw new NotionApiError(`Failed to fetch categories from Notion: ${error.message}`);
    }
}


module.exports = {
    findAll,
    mapNotionPageToCategory,
};
