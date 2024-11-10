# Express To-Do API Documentation

## Authentication Routes

### Sign Up
- **POST** `http://localhost:8080/auth/signup`
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123",
    "username": "testuser"
  }
  ```

### Login
- **POST** `http://localhost:8080/auth/login`
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

---

## To-Do Routes

### Add a New To-Do
- **POST** `http://localhost:8080/todos/add`
  ```json
  {
    "title": "New Todo",
    "description": "This is a description of the new todo",
    "userId": 1
  }
  ```

### Get All To-Dos for a User
- **GET** `http://localhost:8080/todos/?userId=1`

### Update To-Do Data (Title & Description)
- **PUT** `http://localhost:8080/todos/update-data/1`
  ```json
  {
    "title": "Updated Todo Title",
    "description": "Updated description of the todo"
  }
  ```

### Update To-Do Completion Status
- **PUT** `http://localhost:8080/todos/update-completed/1`
  ```json
  {
    "isCompleted": true
  }
  ```

### Delete a To-Do
- **GET** `http://localhost:8080/todos/delete/1`
