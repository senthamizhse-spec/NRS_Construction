<?php
/* ============================================
   GSD TO-DO APP - BACKEND FOLDER
   ============================================
   
   ABOUT THIS FOLDER:
   This folder is for advanced students who want to build
   a full-stack application with database functionality.
   
   BASIC APP (No Backend Needed):
   If you're just starting, you can complete the entire
   to-do app using only HTML, CSS, JavaScript, and
   localStorage. You don't need this folder yet!
   
   ADVANCED APP (With Backend):
   Once you're ready to add backend features, this folder
   will contain:
   - PHP files for server-side logic
   - Database connection scripts
   - API endpoints for CRUD operations
   - User authentication (login/register)
   - Data validation and security
   
   ============================================ */
?>

# Backend Development Guide

## 🎯 When to Use Backend

Add backend functionality when you want to:
- **Save tasks to a database** (instead of localStorage)
- **Share tasks across devices** (requires user accounts)
- **Add user authentication** (login/register)
- **Allow multiple users** with separate task lists
- **Add advanced features** like sharing tasks with others

## 📋 Prerequisites

Before working on the backend, you should:
- ✅ Have a working front-end (HTML/CSS/JavaScript)
- ✅ Understand localStorage implementation
- ✅ Know basic PHP syntax
- ✅ Have access to a PHP server (XAMPP, MAMP, or web hosting)
- ✅ Understand MySQL database basics

## 🗄️ Database Setup

### Step 1: Create Database
```sql
CREATE DATABASE gsd_todo_app;
USE gsd_todo_app;
```

### Step 2: Create Users Table (Optional - for authentication)
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 3: Create Tasks Table
```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    task_text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 📁 Suggested Backend Files

Create these PHP files in this folder:

### 1. `config.php` - Database Connection
```php
<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
define('DB_NAME', 'gsd_todo_app');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
```

### 2. `api.php` - Main API Endpoint
Handle CRUD operations for tasks:
- GET: Fetch all tasks
- POST: Create new task
- PUT: Update task (mark complete/incomplete)
- DELETE: Delete task

### 3. `auth.php` - User Authentication (Optional)
Handle user login and registration

## 🔌 API Endpoints to Create

### Get All Tasks
```
GET /back-end/api.php?action=getTasks&user_id=1
```

### Add New Task
```
POST /back-end/api.php?action=addTask
Body: { "task_text": "New task", "user_id": 1 }
```

### Update Task
```
POST /back-end/api.php?action=updateTask
Body: { "task_id": 5, "completed": true }
```

### Delete Task
```
POST /back-end/api.php?action=deleteTask
Body: { "task_id": 5 }
```

## 🔐 Security Considerations

When building your backend:
- ✅ Use prepared statements to prevent SQL injection
- ✅ Validate and sanitize all user input
- ✅ Hash passwords using `password_hash()`
- ✅ Implement session management for user authentication
- ✅ Use HTTPS in production
- ✅ Add CORS headers if needed
- ✅ Implement rate limiting for API calls

## 🚀 Next Steps

1. **Start Simple**: Get one API endpoint working first
2. **Test with Postman**: Test your API before connecting to front-end
3. **Update JavaScript**: Modify `script.js` to use fetch() API
4. **Add Error Handling**: Handle network errors gracefully
5. **Add Loading States**: Show spinners while data loads

## 📚 Helpful Resources

- PHP Documentation: https://www.php.net/docs.php
- MySQL Tutorial: https://www.mysqltutorial.org/
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- AJAX Tutorial: https://www.w3schools.com/js/js_ajax_intro.asp

## ✅ Backend Completion Checklist

- [ ] Database created with proper tables
- [ ] Database connection file working
- [ ] API endpoint for getting tasks
- [ ] API endpoint for adding tasks
- [ ] API endpoint for updating tasks
- [ ] API endpoint for deleting tasks
- [ ] JavaScript updated to use API
- [ ] Error handling implemented
- [ ] Security measures in place
- [ ] (Optional) User authentication working

Good luck with your backend development! 🚀