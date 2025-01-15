# API Documentation

<!-- user Register Docs -->
### User Registration

## Endpoint: `/users/register`

### HTTP Method: POST

### Description:
This endpoint is used to register a new user. It requires the user's username, email, and password.

## API Endpoints

### Request Body:
The request body should be a JSON object containing the following fields:

- `username`: A string containing the user's username.
- `email`: A string representing the user's email (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

### Example Request:
```json
{
  "username": "john",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code:** 201 Created
  - **201 Created:** User registered successfully.

- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "username": "john",
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Errors:
- **Status Code:** 400 Bad Request
  - **400 Bad Request:** Validation errors.

- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Username must be at least 3 characters long",
        "param": "username",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### Notes:
- Ensure that the email provided is unique and not already registered.
- Passwords are hashed before being stored in the database for security purposes.

<!-- user login Docs -->
### User Login

## Endpoint: `/users/login`

### Method: POST

### Description:
This endpoint is used to log in an existing user. It requires the user's email and password.

### Request Body:
The request body should be a JSON object containing the following fields:
- `email`: A string representing the user's email (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

### Example Request:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code:** 200 OK
  - **200 OK:** User logged in successfully.

- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "username": "john",
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Errors:
- **Status Code:** 400 Bad Request
  - **400 Bad Request:** Validation errors.

- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Authentication Errors:
- **Status Code:** 401 Unauthorized
  - **401 Unauthorized:** Invalid email or password.

- **Response Body:**
  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

### Notes:
- Ensure that the email provided is registered.
- Passwords are compared using a secure hashing algorithm.

<!-- user profile Docs -->
### User Profile

## Endpoint: `/users/profile`

### HTTP Method: GET

### Description:
This endpoint is used to get the profile of the authenticated user.

### Request Headers:
- `Authorization`: Bearer token obtained during login.

### Responses:

#### Success:
- **Status Code:** 200 OK
  - **200 OK:** User profile retrieved successfully.

- **Response Body:**
  ```json
  {
    "_id": "user_id_here",
    "username": "john",
    "email": "john.doe@example.com"
  }
  ```

#### Authentication Errors:
- **Status Code:** 401 Unauthorized
  - **401 Unauthorized:** Authentication failed.

- **Response Body:**
  ```json
  {
    "message": "Authentication failed"
  }
  ```

### Notes:
- Ensure that the token provided is valid and not expired.

<!-- user logout Docs -->
### User Logout

## Endpoint: `/users/logout`

### HTTP Method: GET

### Description:
This endpoint is used to log out the authenticated user.

### Request Headers:
- `Authorization`: Bearer token obtained during login.

### Responses:

#### Success:
- **Status Code:** 200 OK
  - **200 OK:** User logged out successfully.

- **Response Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Authentication Errors:
- **Status Code:** 401 Unauthorized
  - **401 Unauthorized:** Authentication failed.

- **Response Body:**
  ```json
  {
    "message": "Authentication failed"
  }
  ```

### Notes:
- Ensure that the token provided is valid and not expired.

<!-- user Donation Docs -->

## Features
- View different social work initiatives
- Make donations to support initiatives
- Authentication for secure donations

## Frontend
The frontend is built using React and Tailwind CSS.

### Components
- **SocialworkSection/Socialwork.jsx**: Displays the list of social work initiatives and allows users to make donations.

## Backend
The backend is built using Node.js, Express, and MongoDB.

### Models
- **support.model.js**: Defines the schema for support initiatives.

### Controllers
- **support.controller.js**: Handles fetching support initiatives from the database.

### Routes
- **support.routes.js**: Defines the API routes for support initiatives.

### Get Supports
- **Endpoint:** `/support`
- **Method:** GET
- **Description:** Fetch all support initiatives.
- **Responses:**
  - **200 OK:** Support initiatives retrieved successfully.
  - **400 Bad Request:** No support initiatives found.
