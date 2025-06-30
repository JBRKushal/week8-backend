# Full-Stack To-Do Application

A modern, full-featured To-Do application built with React (frontend) and Node.js/Express (backend).

## Features

- **Authentication**: JWT-based user registration and login
- **Task Management**: Full CRUD operations on tasks
- **User Isolation**: Each user sees only their own tasks
- **Beautiful UI**: Tailwind CSS with Framer Motion animations
- **Responsive Design**: Works on all device sizes
- **Secure**: Protected routes and token-based authentication

## Technology Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- SQLite
- JWT
- bcrypt
- Express Validator
- CORS

## Project Structure

```
todo-app/
├── client/     # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/     # Node.js backend
│   ├── src/
│   ├── data/   # SQLite database files
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Database Setup
The application uses SQLite, which requires no additional setup. The database file will be automatically created when you first run the backend server.

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env file with your JWT secret
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env
# Edit .env file with your API URL
npm start
```

### Environment Variables

#### Server (.env)
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

#### Client (.env)
```
VITE_API_URL=http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Running the Application

1. Start the backend server (runs on port 5000)
2. Start the frontend development server (runs on port 5173)
3. Open http://localhost:5173 in your browser

## Features in Detail

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, edit, complete, and delete tasks
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Data Persistence**: All data stored in SQLite database
- **Security**: Protected API routes and client-side route protection# week8-backend
