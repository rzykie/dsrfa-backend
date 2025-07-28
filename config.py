import os
from typing import List
from pydantic import BaseSettings


class Settings(BaseSettings):
    # Database Configuration
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./dsrfa.db")

    # Security
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", "your-super-secret-key-here-change-this-in-production"
    )
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "43200")
    )  # 30 days

    # API Configuration
    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"

    # CORS Configuration
    ALLOWED_ORIGINS: List[str] = os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173"
    ).split(",")
    ALLOWED_METHODS: List[str] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    ALLOWED_HEADERS: List[str] = ["*"]

    # File Upload Configuration
    UPLOAD_DIRECTORY: str = os.getenv("UPLOAD_DIRECTORY", "./uploads")
    MAX_FILE_SIZE: int = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # 10MB
    ALLOWED_IMAGE_EXTENSIONS: List[str] = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    ALLOWED_VIDEO_EXTENSIONS: List[str] = [".mp4", ".avi", ".mov", ".wmv"]

    # Email Configuration
    EMAIL_HOST: str = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    EMAIL_PORT: int = int(os.getenv("EMAIL_PORT", "587"))
    EMAIL_USERNAME: str = os.getenv("EMAIL_USERNAME", "")
    EMAIL_PASSWORD: str = os.getenv("EMAIL_PASSWORD", "")
    EMAIL_FROM: str = os.getenv("EMAIL_FROM", "noreply@dsrfa.com")

    # SMS Configuration
    SMS_API_KEY: str = os.getenv("SMS_API_KEY", "")
    SMS_API_SECRET: str = os.getenv("SMS_API_SECRET", "")

    # Payment Gateway Configuration
    PAYMENT_GATEWAY_API_KEY: str = os.getenv("PAYMENT_GATEWAY_API_KEY", "")
    PAYMENT_GATEWAY_SECRET: str = os.getenv("PAYMENT_GATEWAY_SECRET", "")
    PAYMENT_GATEWAY_BASE_URL: str = os.getenv("PAYMENT_GATEWAY_BASE_URL", "")

    # Application Settings
    APP_NAME: str = "DSRFA Backend API"
    APP_VERSION: str = "1.2.5"
    APP_DESCRIPTION: str = (
        "Davao-South Regional Football Association - Backend API for member management, events, and community engagement"
    )

    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100

    # Cache Settings
    CACHE_TTL: int = int(os.getenv("CACHE_TTL", "300"))  # 5 minutes

    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()
