# Budget Buddy API

A RESTful API for personal budget tracking with Notion as the data store, following clean architecture principles.

## Project Overview

Budget Buddy API is a single-user budget tracking system that leverages Notion databases for data persistence. The project follows a layered architecture approach with clear separation between repositories, services, controllers, and routes.

## Current Status: Early Development 🚧

**What's Working:**
- ✅ **Foundation** - Express app with middleware and error handling
- ✅ **Health Check** - `/health` endpoint
- ✅ **Notion Connection** - Successfully connecting to Notion API
- ✅ **GET Categories** - `/api/v1/categories` endpoint fetches data from Notion
- ✅ **GET Category by ID** - `/api/v1/categories/:id` endpoint tested and working
- ✅ **Auto-generated Category IDs** - Sequential format (CAT-001, CAT-002, etc.)

**In Progress:**
- 🔧 POST create category endpoint (repository layer complete)

**Next Steps:**
- 📋 Complete POST create category (service, controller, routes)
- 📋 Implement PUT update category
- 📋 Implement DELETE category
- 📋 Build Transactions API (more complex with relations)
- 📋 Build Accounts API (read-only)
- 📋 Build Dashboard API (aggregations)

## Technologies

- **Node.js** - JavaScript runtime
- **Express.js 5.x** - Web framework
- **Notion API** - Data persistence via [@notionhq/client](https://github.com/makenotion/notion-sdk-js)
- **dotenv** - Environment variable management

## Architecture

This project follows **clean architecture** principles with four distinct layers:

```
┌─────────────┐
│   Routes    │  HTTP endpoint definitions
└──────┬──────┘
       │
┌──────▼──────┐
│ Controllers │  Request/response handling
└──────┬──────┘
       │
┌──────▼──────┐
│  Services   │  Business logic
└──────┬──────┘
       │
┌──────▼──────┐
│Repositories │  Data access (Notion API)
└─────────────┘
```

### Project Structure

```
src/
├── routes/          # API endpoint definitions
├── controllers/     # HTTP request handlers
├── services/        # Business logic layer
├── repositories/    # Notion API interactions
├── middleware/      # Express middleware (error handling)
└── config/          # Configuration and environment variables
```

## Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher)
2. **Notion Account** with:
   - A Notion integration created
   - Three databases set up: Categories, Accounts, Transactions
   - Integration connected to all databases

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd budget-buddy-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your Notion credentials:
   ```
   NOTION_API_KEY=your_notion_integration_token
   NOTION_CATEGORIES_DATABASE_ID=your_categories_db_id
   NOTION_ACCOUNTS_DATABASE_ID=your_accounts_db_id
   NOTION_TRANSACTIONS_DATABASE_ID=your_transactions_db_id
   PORT=3000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Categories (In Progress)
- ✅ `GET /api/v1/categories` - List all categories
- ✅ `GET /api/v1/categories/:id` - Get single category by ID
- 🔧 `POST /api/v1/categories` - Create new category (repository complete, needs service/controller/routes)
- 📋 `PUT /api/v1/categories/:id` - Update category (planned)
- 📋 `DELETE /api/v1/categories/:id` - Delete (archive) category (planned)

### Transactions 📋 Planned
- `GET /api/v1/transactions` - List all transactions (with filtering)
- `GET /api/v1/transactions/:id` - Get single transaction
- `POST /api/v1/transactions` - Create new transaction
- `PUT /api/v1/transactions/:id` - Update transaction
- `DELETE /api/v1/transactions/:id` - Delete transaction

### Accounts 📋 Planned
- `GET /api/v1/accounts` - List all accounts with balances
- `GET /api/v1/accounts/:id` - Get single account

### Dashboard 📋 Planned
- `GET /api/v1/dashboard?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Financial summary

## Development

### Available Scripts

```bash
npm start      # Run in production mode
npm run dev    # Run in development mode with auto-reload (nodemon)
```

### Code Organization

**Repositories** (`src/repositories/`)
- Direct Notion API interactions
- Data mapping between Notion format and API models
- No business logic

**Services** (`src/services/`)
- Business logic and validation
- Orchestrates repository calls
- No HTTP knowledge

**Controllers** (`src/controllers/`)
- HTTP request/response handling
- Extracts request data
- Calls service layer
- Returns proper status codes

**Routes** (`src/routes/`)
- Endpoint definitions
- Maps URLs to controller methods
- No logic

## Notion Database Setup

Required databases:
1. **Categories** - `Name` (Title), `Category ID` (Text)
2. **Accounts** - `Name` (Title), `Initial Balance` (Number), `Current Balance` (Number)
3. **Transactions** - `Name` (Title), `Date` (Date), `Amount` (Number), `Type` (Select: Income/Expense), `Category` (Relation), `Account` (Relation), `Notes` (Text)

## Project Roadmap

- [x] Phase 0: Notion workspace setup
- [x] Phase 1: Foundation (Express, config, error handling)
- [ ] Phase 2: Categories API (GET endpoints complete, POST in progress)
- [ ] Phase 3: Transactions API
- [ ] Phase 4: Accounts & Dashboard
- [ ] Phase 5: Polish & documentation
- [ ] Phase 6: Testing infrastructure (future)

## Contributing

This is a personal learning project. Feel free to fork and adapt for your own use.

## License

MIT

## Notes

- This is a **single-user application** - no authentication/authorization in MVP
- Data is stored in **your own Notion workspace**
- **Manual setup required** - you must create databases and integration yourself
- Follows clean architecture and REST API best practices
