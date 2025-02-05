# String Ventures Assignment

## Overview

This project is a full-stack web application designed to manage books, users, and transactions. It includes a backend API and a frontend interface. The application is built using modern tools and frameworks to ensure scalability and maintainability.

## Features

### Backend

- User authentication (login, registration, and user management)
- CRUD operations for books
- Transaction management
- Dashboard statistics
- Middleware for authentication and error handling

### Frontend

- User-friendly React-based interface
- Responsive design using Tailwind CSS
- Admin dashboard for managing books and users
- Authentication flow (login/logout)
- Visualization of transactions and statistics

---

## Technologies Used

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **Vercel**: Deployment

### Frontend

- **React.js**: Frontend library
- **Tailwind CSS**: Styling
- **Vite**: Development environment

---

## Project Structure

### Backend

```
backend/
|-- config/                # Configuration files (e.g., database connection)
|-- controllers/           # Route handlers
|-- middlewares/           # Custom middleware
|-- models/                # Database models
|-- routes/                # API routes
|-- utils/                 # Utility functions
|-- package.json           # Dependencies
|-- index.js               # Application entry point
```

### Frontend

```
frontend/
|-- public/                # Static assets
|-- src/                   # Source code
|   |-- components/        # Reusable components
|   |-- context/           # Context API for global state
|   |-- pages/             # Application pages
|   |-- utils/             # Helper functions
|-- index.html             # HTML entry point
|-- tailwind.config.js     # Tailwind configuration
|-- vite.config.js         # Vite configuration
```

---

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- NPM or Yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with the following:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. Access the backend API at `http://localhost:8000`.
2. Open the frontend at `http://localhost:5173` (or as indicated by the Vite dev server).
3. Use the application to manage books, users, and transactions.

---

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/users`: Get all users

### Books

- `GET /api/books`: Fetch all books
- `POST /api/books`: Add a new book
- `PUT /api/books/:id`: Update book details
- `DELETE /api/books/:id`: Delete a book

### Transactions

- `GET /api/transactions`: Get all transactions
- `POST /api/transactions`: Create a transaction

### Statistics

- `GET /api/stats`: Fetch dashboard statistics

---

## Deployment

Both the backend and frontend can be deployed using Vercel:

1. Push the code to a Git repository.
2. Connect the repository to Vercel.
3. Configure the environment variables in Vercel's settings.
