const { Client } = require('@notionhq/client');
const config = require('../config');

/**
 * Notion API Client
 * Singleton instance of the Notion client
 * Reused across all repository modules
 */

let notionClient = null;

/**
 * Initialize and return Notion client
 * @returns {Client} Notion client instance
 */
function getNotionClient() {
  if (!notionClient) {
    try {
      notionClient = new Client({
        auth: config.notionApiKey,
      });
      console.log('✅ Notion client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Notion client:', error.message);
      throw new Error('Notion client initialization failed');
    }
  }

  return notionClient;
}

module.exports = getNotionClient();
