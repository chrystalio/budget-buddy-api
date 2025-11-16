const config = require('../config');

/**
 * Custom Error Classes
 */

class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

class NotionApiError extends AppError {
  constructor(message) {
    super(message, 500, 'NOTION_API_ERROR');
  }
}

/**
 * Global Error Handler Middleware
 * Catches all errors and returns consistent JSON responses
 * Never exposes internal error details to the client
 */
function errorHandler(err, req, res, next) {
  // Default error values
  let statusCode = err.statusCode || 500;
  let errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'An unexpected error occurred';

  // Handle Notion API errors
  if (err.code === 'notionhq_client_request_timeout') {
    statusCode = 504;
    errorCode = 'NOTION_TIMEOUT';
    message = 'Notion API request timed out';
  } else if (err.code === 'notionhq_client_response_error') {
    statusCode = 502;
    errorCode = 'NOTION_API_ERROR';
    message = 'Notion API returned an error';
  } else if (err.code === 'object_not_found') {
    statusCode = 404;
    errorCode = 'NOT_FOUND';
    message = 'The requested resource was not found in Notion';
  } else if (err.code === 'unauthorized') {
    statusCode = 401;
    errorCode = 'UNAUTHORIZED';
    message = 'Invalid Notion API credentials';
  } else if (err.code === 'restricted_resource') {
    statusCode = 403;
    errorCode = 'FORBIDDEN';
    message = 'Access to this Notion resource is restricted';
  }

  // Log error details (only in development)
  if (config.nodeEnv === 'development') {
    console.error('❌ Error occurred:');
    console.error('   Status:', statusCode);
    console.error('   Code:', errorCode);
    console.error('   Message:', message);
    if (err.stack) {
      console.error('   Stack:', err.stack);
    }
  } else {
    // In production, log errors without exposing to client
    console.error(`[${new Date().toISOString()}] ${errorCode}: ${message}`);
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: message,
      // Only include stack trace in development
      ...(config.nodeEnv === 'development' && err.stack && { stack: err.stack }),
    },
  });
}

/**
 * 404 Handler for undefined routes
 */
function notFoundHandler(req, res, next) {
  const error = new NotFoundError(`Route ${req.method} ${req.path} not found`);
  next(error);
}

module.exports = {
  errorHandler,
  notFoundHandler,
  AppError,
  ValidationError,
  NotFoundError,
  NotionApiError,
};
