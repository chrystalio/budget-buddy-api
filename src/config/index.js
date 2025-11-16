require('dotenv').config();

/**
 * Application configuration
 * Loads and validates environment variables on startup
 */

const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Notion API configuration
  notionApiKey: process.env.NOTION_API_KEY,
  notionDatabases: {
    transactions: process.env.NOTION_TRANSACTIONS_DATABASE_ID,
    categories: process.env.NOTION_CATEGORIES_DATABASE_ID,
    accounts: process.env.NOTION_ACCOUNTS_DATABASE_ID,
  },
};

/**
 * Validate required environment variables
 * Fails fast if any required config is missing
 */
function validateConfig() {
  const requiredVars = [
    'NOTION_API_KEY',
    'NOTION_TRANSACTIONS_DATABASE_ID',
    'NOTION_CATEGORIES_DATABASE_ID',
    'NOTION_ACCOUNTS_DATABASE_ID',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    console.error('See .env.example for reference.\n');
    process.exit(1);
  }

  const databaseIds = [
    { name: 'NOTION_TRANSACTIONS_DATABASE_ID', value: config.notionDatabases.transactions },
    { name: 'NOTION_CATEGORIES_DATABASE_ID', value: config.notionDatabases.categories },
    { name: 'NOTION_ACCOUNTS_DATABASE_ID', value: config.notionDatabases.accounts },
  ];

  const invalidIds = databaseIds.filter(db => {
    const id = db.value.replace(/-/g, '');
    return id.length !== 32;
  });

  if (invalidIds.length > 0) {
    console.error('❌ Invalid Notion database ID format:');
    invalidIds.forEach(db => {
      console.error(`   - ${db.name}: ${db.value}`);
    });
    console.error('\nDatabase IDs should be 32 characters long (no hyphens).');
    console.error('Example: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6\n');
    process.exit(1);
  }

  console.log('✅ Configuration validated successfully');
}

// Validate configuration on module load
validateConfig();

module.exports = config;
