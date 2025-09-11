# MCAN National Website API Documentation

## Overview
The MCAN National Website API provides comprehensive endpoints for managing the Muslim Corpers Association of Nigeria platform. This RESTful API supports authentication, member management, payment processing, property management, and marketplace functionality.

## Base URL
- Development: `http://localhost:5000/api/v1`
- Production: `https://api.mcan.org.ng/api/v1`

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user profile
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `POST /auth/change-password` - Change password
- `POST /auth/verify-email` - Verify email address
- `POST /auth/resend-verification` - Resend verification email

### Users (`/users`)
- `GET /users` - Get all users (Admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user (Admin only)
- `PATCH /users/:id/activate` - Activate user (Admin only)
- `PATCH /users/:id/deactivate` - Deactivate user (Admin only)

### Members (`/members`)
- `GET /members` - Get all members
- `GET /members/:id` - Get member by ID
- `POST /members` - Create new member
- `PUT /members/:id` - Update member
- `POST /members/:id/eid` - Generate e-ID card
- `GET /members/:id/eid` - Get member's e-ID card
- `GET /members/:id/eid/download` - Download e-ID card

### Payments (`/payments`)
- `GET /payments` - Get all payments
- `GET /payments/:id` - Get payment by ID
- `POST /payments/consent` - Create payment consent
- `GET /payments/consent/:id` - Get payment consent
- `PUT /payments/consent/:id` - Update payment consent
- `POST /payments/initialize` - Initialize payment
- `POST /payments/verify` - Verify payment
- `POST /payments/webhook` - Payment webhook (Flutterwave)

### Properties (`/properties`)
- `GET /properties` - Get all properties
- `GET /properties/:id` - Get property by ID
- `POST /properties` - Create new property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property
- `POST /properties/:id/photos` - Upload property photos
- `GET /properties/map` - Get properties for map view

### Marketplace (`/marketplace`)
- `GET /marketplace/products` - Get all products
- `GET /marketplace/products/:id` - Get product by ID
- `GET /marketplace/orders` - Get user's orders
- `GET /marketplace/orders/:id` - Get order by ID
- `POST /marketplace/orders` - Create new order
- `PATCH /marketplace/orders/:id/cancel` - Cancel order
- `GET /marketplace/cart` - Get user's cart
- `POST /marketplace/cart` - Add item to cart
- `DELETE /marketplace/cart/:productId` - Remove item from cart

### Dashboard (`/dashboard`)
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /dashboard/members` - Get member statistics
- `GET /dashboard/revenue` - Get revenue statistics
- `GET /dashboard/states` - Get state-wise statistics
- `GET /dashboard/recent-activities` - Get recent activities
- `GET /dashboard/notifications` - Get user notifications
- `PATCH /dashboard/notifications/:id/read` - Mark notification as read
- `PATCH /dashboard/notifications/read-all` - Mark all notifications as read
- `GET /dashboard/reports` - Get dashboard reports

## Response Format
All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling
Error responses include:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

## Rate Limiting
- 100 requests per 15 minutes per IP address
- Authentication endpoints: 5 requests per minute per IP

## Pagination
List endpoints support pagination:

```
GET /api/v1/members?page=1&limit=10
```

Response includes pagination metadata:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## User Roles
- `SUPER_ADMIN` - Full system access
- `NATIONAL_ADMIN` - National-level management
- `STATE_AMEER` - State chapter leadership
- `STATE_SECRETARY` - State administrative functions
- `MCLO_AMEER` - Local chapter leadership
- `MEMBER` - Standard corps member access

## Webhooks
The API supports webhooks for payment processing:

- **Flutterwave Payment Webhook**: `POST /api/v1/payments/webhook`

## SDKs and Libraries
- JavaScript/TypeScript: Available via npm
- Python: Available via pip
- PHP: Available via Composer

## Support
For API support and questions:
- Email: tech@mcan.org.ng
- Documentation: https://api.mcan.org.ng/api-docs
- Status Page: https://status.mcan.org.ng
