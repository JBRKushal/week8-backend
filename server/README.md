# TaskFlow Server

Node.js/Express backend server for the TaskFlow todo application.

## Features

- JWT Authentication
- SQLite Database Integration
- RESTful API Design
- Input Validation
- Security Middleware
- Rate Limiting
- CORS Support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your configuration:
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=development
```

## Database Setup

The application uses SQLite as its database, which requires no additional setup. The database file will be automatically created in the `server/data/` directory when you first run the application.

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Tasks (Authenticated Routes)
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a specific task
- `DELETE /api/tasks/:id` - Delete a specific task
- `GET /api/tasks/stats` - Get task statistics

### Health Check
- `GET /api/health` - Server health check

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT 0,
  priority TEXT DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high')),
  due_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention

## Error Handling

The server includes comprehensive error handling:
- Validation errors return 400 status codes
- Authentication errors return 401 status codes
- Not found errors return 404 status codes
- Server errors return 500 status codes

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| JWT_SECRET | Secret key for JWT tokens | - |
| NODE_ENV | Environment mode | development |

## Development

### Project Structure
```
server/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # Route definitions
│   └── server.js        # Main server file
├── data/                # SQLite database files
├── package.json
├── .env.example
└── README.md
```

### Adding New Features

1. Create new models in `src/models/`
2. Add controllers in `src/controllers/`
3. Define routes in `src/routes/`
4. Add middleware if needed in `src/middleware/`

## Testing

Currently, no tests are implemented. To add testing:

1. Install testing dependencies (Jest, Supertest)
2. Create test files in a `tests/` directory
3. Add test scripts to `package.json`

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use a process manager like PM2
3. Set up reverse proxy with Nginx
4. Use environment variables for configuration
5. Set up SSL/TLS certificates
6. Set up logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.