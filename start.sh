#!/bin/bash

# DSRFA Backend Startup Script

echo "🚀 Starting DSRFA Backend Setup..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOL
# Database Configuration
DATABASE_URL=sqlite:///./dsrfa.db

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174

# File Upload Configuration
UPLOAD_DIRECTORY=./uploads
MAX_FILE_SIZE=10485760

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_FROM=noreply@dsrfa.com
EOL
    echo "✅ .env file created"
fi

# Create uploads directory
if [ ! -d "uploads" ]; then
    mkdir uploads
    echo "📁 Created uploads directory"
fi

# Install dependencies using uv
if [ -f "pyproject.toml" ]; then
    echo "📦 Installing dependencies with uv..."
    uv sync
    echo "✅ Dependencies installed"
elif [ -f "requirements.txt" ]; then
    echo "📦 Installing dependencies with uv..."
    uv pip install -r requirements.txt
    echo "✅ Dependencies installed"
fi

# Initialize database
echo "🗄️  Initializing database..."
uv run python init_db.py

# Start the server
echo "🌐 Starting FastAPI server..."
echo "📍 API will be available at: http://localhost:8000"
echo "📖 API Documentation: http://localhost:8000/docs"
echo "🔧 Alternative docs: http://localhost:8000/redoc"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

uv run python run.py 