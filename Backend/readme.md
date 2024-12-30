# API Documentation

<!-- user Register Docs -->


## Endpoint: `/users/register`

### HTTP Method: POST

### Description:
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body:
The request body should be a JSON object containing the following fields:

- `user` (object):
- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum 3 characters).
  - `lastname`: A string representing the user's last name (minimum 3 characters).
- `email`: A string representing the user's email (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

### Example Request:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code:** 201 Created
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Errors:
- **Status Code:** 400 Bad Request
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
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
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
- **Response Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Errors:
- **Status Code:** 400 Bad Request
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

## Endpoint: `/users/profile`

### HTTP Method: GET

### Description:
This endpoint is used to get the profile of the authenticated user.

### Request Headers:
- `Authorization`: Bearer token obtained during login.

### Responses:

#### Success:
- **Status Code:** 200 OK
- **Response Body:**
  ```json
  {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

#### Authentication Errors:
- **Status Code:** 401 Unauthorized
- **Response Body:**
  ```json
  {
    "message": "Authentication failed"
  }
  ```

### Notes:
- Ensure that the token provided is valid and not expired.

<!-- user logout Docs -->

## Endpoint: `/users/logout`

### HTTP Method: GET

### Description:
This endpoint is used to log out the authenticated user.

### Request Headers:
- `Authorization`: Bearer token obtained during login.

### Responses:

#### Success:
- **Status Code:** 200 OK
- **Response Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Authentication Errors:
- **Status Code:** 401 Unauthorized
- **Response Body:**
  ```json
  {
    "message": "Authentication failed"
  }
  ```

### Notes:
- Ensure that the token provided is valid and not expired.
