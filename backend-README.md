# DSRFA Backend API

FastAPI backend for the Davao-South Regional Football Association web application.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Registration, profile management, role assignment
- **Club Management**: Club registration, member management, club details
- **Event Management**: Event creation, registration, participant tracking
- **Payment Processing**: Payment tracking, financial reports, membership renewals
- **Sponsor Management**: Sponsor registration and management
- **Gallery Management**: Photo and media uploads
- **Admin Features**: System settings, user approval, analytics

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **PostgreSQL**: Primary database (SQLite for development)
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Pydantic**: Data validation using Python type annotations
- **Docker**: Containerization for easy deployment

## Quick Start

### Prerequisites

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) - Fast Python package installer (recommended)
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (if not using Docker)

### Method 1: Using Docker (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   cd dsrfa-backend
   ```

2. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access the API:**
   - API: http://localhost:8000
   - Interactive API docs: http://localhost:8000/docs
   - pgAdmin: http://localhost:5050 (admin@dsrfa.com / admin123)

### Method 2: Local Development

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the application:**
   ```bash
   uvicorn main:app --reload
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### User Management
- `GET /users` - List users (Admin only)
- `GET /users/{user_id}` - Get user details
- `PUT /users/{user_id}` - Update user profile
- `POST /users/{user_id}/approve` - Approve user (Admin only)
- `POST /users/{user_id}/reject` - Reject user (Admin only)

### Club Management
- `GET /clubs` - List all clubs
- `POST /clubs` - Create new club
- `GET /clubs/{club_id}` - Get club details
- `GET /clubs/{club_id}/members` - Get club members

### Event Management
- `GET /events` - List events (with filters)
- `POST /events` - Create event (Admin/Club Owner)
- `GET /events/{event_id}` - Get event details
- `PUT /events/{event_id}` - Update event
- `POST /events/{event_id}/register` - Register for event
- `GET /events/{event_id}/registrations` - Get event registrations

### Payment Management
- `GET /payments` - List payments
- `POST /payments` - Create payment record
- `PUT /payments/{payment_id}/status` - Update payment status (Admin)

### Sponsor Management
- `GET /sponsors` - List sponsors
- `POST /sponsors` - Create sponsor (Admin)
- `GET /sponsors/{sponsor_id}` - Get sponsor details
- `PUT /sponsors/{sponsor_id}` - Update sponsor (Admin)

### Gallery
- `GET /gallery` - List gallery items
- `POST /gallery/upload` - Upload media

### Statistics & Reports
- `GET /stats/dashboard` - Dashboard statistics (Admin)
- `GET /stats/financial` - Financial reports (Admin)

### System Settings
- `GET /settings` - Get system settings (Admin)
- `PUT /settings` - Update system settings (Admin)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **Player**: Regular member, can register for events, view profile
- **Club Owner**: Can manage club members, create events
- **Admin**: Full access to all features and user management
- **Coach**: Similar to player with additional coaching privileges
- **Referee**: Can manage event officiating

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://dsrfa_user:dsrfa_password@localhost/dsrfa_db

# Security
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# File Upload
UPLOAD_DIRECTORY=./uploads
MAX_FILE_SIZE=10485760

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Database Schema

### Key Tables

- **users**: User accounts and profiles
- **clubs**: Football clubs and organizations
- **events**: Events, tournaments, and activities
- **event_registrations**: Event participant registrations
- **payments**: Payment records and transactions
- **sponsors**: Sponsor information and details
- **gallery**: Media files and photos
- **system_settings**: Application configuration

## Development

### Running Tests

```bash
pytest
```

### Database Migrations

Using Alembic for database migrations:

```bash
# Create migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head
```

### Code Formatting

```bash
# Format code
black .

# Sort imports
isort .

# Lint code
flake8 .
```

## Production Deployment

### Using Docker

1. **Build production image:**
   ```bash
   docker build -t dsrfa-backend .
   ```

2. **Run with production settings:**
   ```bash
   docker run -p 8000:8000 \
     -e DATABASE_URL=postgresql://user:pass@host/db \
     -e SECRET_KEY=your-production-secret \
     -e DEBUG=False \
     dsrfa-backend
   ```

### Environment Setup

- Set `DEBUG=False` in production
- Use strong `SECRET_KEY`
- Configure proper database connection
- Set up SSL/TLS certificates
- Configure reverse proxy (nginx)
- Set up monitoring and logging

## Security

- JWT tokens expire after 30 days (configurable)
- Passwords are hashed using bcrypt
- Role-based access control for all endpoints
- CORS protection configured
- SQL injection protection via SQLAlchemy ORM
- Input validation using Pydantic models

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Support

For issues and questions:
1. Check the API documentation at `/docs`
2. Review the code examples in this README
3. Check application logs for error details
4. Create an issue in the project repository

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 