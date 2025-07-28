from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime, date, timedelta
from enum import Enum
import jwt
import bcrypt
import uuid
from sqlalchemy import (
    create_engine,
    Column,
    String,
    DateTime,
    Boolean,
    Integer,
    Float,
    Text,
    ForeignKey,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
import os

# FastAPI app initialization
app = FastAPI(
    title="DSRFA Backend API",
    description="Davao-South Regional Football Association - Backend API for member management, events, and community engagement",
    version="1.2.5",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"

# Database setup (SQLite for development)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dsrfa.db")
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Enums
class UserRole(str, Enum):
    PLAYER = "Player"
    ADMIN = "Admin"
    CLUB_OWNER = "Club Owner"
    COACH = "Coach"
    REFEREE = "Referee"


class MembershipStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"
    PENDING = "Pending"
    EXPIRED = "Expired"


class EventStatus(str, Enum):
    OPEN = "Open"
    FULL = "Full"
    LIVE = "Live"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class EventCategory(str, Enum):
    TOURNAMENT = "Tournament"
    TRAINING = "Training"
    WORKSHOP = "Workshop"
    MEETING = "Meeting"
    SOCIAL = "Social"


class PaymentStatus(str, Enum):
    PENDING = "Pending"
    COMPLETED = "Completed"
    FAILED = "Failed"
    REFUNDED = "Refunded"


# Database Models
class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    phone = Column(String)
    address = Column(String)
    role = Column(String, default=UserRole.PLAYER)
    club_id = Column(String, ForeignKey("clubs.id"))
    position = Column(String)
    bio = Column(Text)
    membership_status = Column(String, default=MembershipStatus.PENDING)
    membership_expiry = Column(DateTime)
    emergency_contact = Column(String)
    medical_info = Column(Text)
    profile_image = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime)
    is_active = Column(Boolean, default=True)

    # Relationships
    club = relationship("Club", back_populates="members")
    event_registrations = relationship("EventRegistration", back_populates="user")
    payments = relationship("Payment", back_populates="user")


class Club(Base):
    __tablename__ = "clubs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(Text)
    location = Column(String)
    contact_email = Column(String)
    contact_phone = Column(String)
    website = Column(String)
    logo = Column(String)
    founded_date = Column(DateTime)
    coach_name = Column(String)
    coach_contact = Column(String)
    home_venue = Column(String)
    jersey_colors = Column(String)
    achievements = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    members = relationship("User", back_populates="club")
    events = relationship("Event", back_populates="organizing_club")


class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    time = Column(String)
    venue = Column(String)
    location = Column(String)
    age_group = Column(String)
    max_participants = Column(Integer)
    registration_fee = Column(Float, default=0.0)
    status = Column(String, default=EventStatus.OPEN)
    image = Column(String)
    organizer = Column(String)
    organizing_club_id = Column(String, ForeignKey("clubs.id"))
    created_by = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    organizing_club = relationship("Club", back_populates="events")
    registrations = relationship("EventRegistration", back_populates="event")
    media = relationship("EventMedia", back_populates="event")


class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = Column(String, ForeignKey("events.id"))
    user_id = Column(String, ForeignKey("users.id"))
    player_name = Column(String)
    player_position = Column(String)
    team_name = Column(String)
    emergency_contact = Column(String)
    medical_conditions = Column(Text)
    registration_date = Column(DateTime, default=datetime.utcnow)
    payment_status = Column(String, default=PaymentStatus.PENDING)
    payment_proof = Column(String)
    status = Column(String, default="Registered")

    # Relationships
    event = relationship("Event", back_populates="registrations")
    user = relationship("User", back_populates="event_registrations")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    event_id = Column(String, ForeignKey("events.id"), nullable=True)
    amount = Column(Float, nullable=False)
    payment_type = Column(String)  # membership, event, renewal
    payment_method = Column(String)  # bank_transfer, gcash, credit_card
    status = Column(String, default=PaymentStatus.PENDING)
    transaction_id = Column(String)
    description = Column(String)
    payment_date = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="payments")


class Sponsor(Base):
    __tablename__ = "sponsors"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(Text)
    logo = Column(String)
    website = Column(String)
    contact_person = Column(String)
    contact_email = Column(String)
    contact_phone = Column(String)
    sponsorship_type = Column(String)  # gold, silver, bronze, event
    sponsorship_amount = Column(Float)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class EventMedia(Base):
    __tablename__ = "event_media"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = Column(String, ForeignKey("events.id"))
    filename = Column(String, nullable=False)
    media_type = Column(String)  # photo, video
    caption = Column(String)
    uploaded_by = Column(String, ForeignKey("users.id"))
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    event = relationship("Event", back_populates="media")


class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String)
    filename = Column(String, nullable=False)
    media_type = Column(String)  # photo, video
    caption = Column(String)
    event_id = Column(String, ForeignKey("events.id"), nullable=True)
    uploaded_by = Column(String, ForeignKey("users.id"))
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    is_featured = Column(Boolean, default=False)


class SystemSettings(Base):
    __tablename__ = "system_settings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    site_name = Column(String, default="Davao-South Regional Football Association")
    maintenance_mode = Column(Boolean, default=False)
    registration_enabled = Column(Boolean, default=True)
    email_notifications = Column(Boolean, default=True)
    sms_notifications = Column(Boolean, default=False)
    auto_approval = Column(Boolean, default=False)
    membership_fee = Column(Float, default=150.0)
    session_timeout = Column(Integer, default=30)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Create tables
Base.metadata.create_all(bind=engine)


# Pydantic Models
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None
    address: Optional[str] = None
    role: UserRole = UserRole.PLAYER
    club_id: Optional[str] = None
    position: Optional[str] = None
    bio: Optional[str] = None
    emergency_contact: Optional[str] = None
    medical_info: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    login_type: str = "member"  # member, admin, club-owner


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    address: Optional[str]
    role: str
    club: Optional[str]
    position: Optional[str]
    bio: Optional[str]
    membership_status: str
    membership_expiry: Optional[datetime]
    emergency_contact: Optional[str]
    medical_info: Optional[str]
    profile_image: Optional[str]
    last_login: Optional[datetime]


class ClubCreate(BaseModel):
    name: str
    description: Optional[str] = None
    location: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    website: Optional[str] = None
    coach_name: Optional[str] = None
    coach_contact: Optional[str] = None
    home_venue: Optional[str] = None
    jersey_colors: Optional[str] = None


class EventCreate(BaseModel):
    title: str
    description: str
    category: EventCategory
    date: datetime
    time: str
    venue: str
    location: str
    age_group: str
    max_participants: int
    registration_fee: float = 0.0
    organizer: Optional[str] = None
    organizing_club_id: Optional[str] = None


class EventRegistrationCreate(BaseModel):
    event_id: str
    player_name: str
    player_position: str
    team_name: Optional[str] = None
    emergency_contact: str
    medical_conditions: Optional[str] = None


class PaymentCreate(BaseModel):
    user_id: str
    event_id: Optional[str] = None
    amount: float
    payment_type: str
    payment_method: str
    description: str


class SponsorCreate(BaseModel):
    name: str
    description: Optional[str] = None
    website: Optional[str] = None
    contact_person: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    sponsorship_type: str
    sponsorship_amount: Optional[float] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


# Dependency functions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    try:
        payload = jwt.decode(
            credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials"
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user


# Helper functions
def user_to_response(user: User) -> UserResponse:
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        phone=user.phone,
        address=user.address,
        role=user.role,
        club=user.club.name if user.club else None,
        position=user.position,
        bio=user.bio,
        membership_status=user.membership_status,
        membership_expiry=user.membership_expiry,
        emergency_contact=user.emergency_contact,
        medical_info=user.medical_info,
        profile_image=user.profile_image,
        last_login=user.last_login,
    )


# API Endpoints


# Health check
@app.get("/")
async def root():
    return {"message": "DSRFA Backend API", "version": "1.2.5", "status": "healthy"}


# Authentication endpoints
@app.post("/auth/register")
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user
    hashed_password = hash_password(user_data.password)
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hashed_password,
        phone=user_data.phone,
        address=user_data.address,
        role=user_data.role,
        club_id=user_data.club_id,
        position=user_data.position,
        bio=user_data.bio,
        emergency_contact=user_data.emergency_contact,
        medical_info=user_data.medical_info,
        membership_expiry=datetime.utcnow() + timedelta(days=365),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully", "user_id": new_user.id}


@app.post("/auth/login")
async def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()

    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not user.is_active:
        raise HTTPException(status_code=401, detail="Account is disabled")

    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()

    access_token = create_access_token({"sub": user.id})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_to_response(user),
    }


@app.get("/auth/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return user_to_response(current_user)


# User management endpoints
@app.get("/users")
async def get_users(
    skip: int = 0,
    limit: int = 100,
    role: Optional[str] = None,
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    query = db.query(User)

    if role:
        query = query.filter(User.role == role)
    if status:
        query = query.filter(User.membership_status == status)

    users = query.offset(skip).limit(limit).all()
    return [user_to_response(user) for user in users]


@app.get("/users/{user_id}")
async def get_user(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Users can view their own profile, admins can view any profile
    if current_user.id != user_id and current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Permission denied")

    return user_to_response(user)


@app.put("/users/{user_id}")
async def update_user(
    user_id: str,
    user_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Users can update their own profile, admins can update any profile
    if current_user.id != user_id and current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Permission denied")

    # Update user fields
    for field, value in user_data.items():
        if hasattr(user, field):
            setattr(user, field, value)

    user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(user)

    return user_to_response(user)


@app.post("/users/{user_id}/approve")
async def approve_user(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.membership_status = MembershipStatus.ACTIVE
    user.updated_at = datetime.utcnow()
    db.commit()

    return {"message": "User approved successfully"}


@app.post("/users/{user_id}/reject")
async def reject_user(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.membership_status = MembershipStatus.INACTIVE
    user.updated_at = datetime.utcnow()
    db.commit()

    return {"message": "User rejected successfully"}


# Club management endpoints
@app.get("/clubs")
async def get_clubs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    clubs = (
        db.query(Club).filter(Club.is_active == True).offset(skip).limit(limit).all()
    )
    return clubs


@app.post("/clubs")
async def create_club(
    club_data: ClubCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    new_club = Club(**club_data.dict())
    db.add(new_club)
    db.commit()
    db.refresh(new_club)
    return new_club


@app.get("/clubs/{club_id}")
async def get_club(club_id: str, db: Session = Depends(get_db)):
    club = db.query(Club).filter(Club.id == club_id).first()
    if not club:
        raise HTTPException(status_code=404, detail="Club not found")
    return club


@app.get("/clubs/{club_id}/members")
async def get_club_members(
    club_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    club = db.query(Club).filter(Club.id == club_id).first()
    if not club:
        raise HTTPException(status_code=404, detail="Club not found")

    members = db.query(User).filter(User.club_id == club_id).all()
    return [user_to_response(member) for member in members]


# Event management endpoints
@app.get("/events")
async def get_events(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Event)

    if category:
        query = query.filter(Event.category == category)
    if status:
        query = query.filter(Event.status == status)

    events = query.offset(skip).limit(limit).all()
    return events


@app.post("/events")
async def create_event(
    event_data: EventCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role not in [UserRole.ADMIN, UserRole.CLUB_OWNER]:
        raise HTTPException(
            status_code=403, detail="Admin or Club Owner access required"
        )

    new_event = Event(**event_data.dict(), created_by=current_user.id)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


@app.get("/events/{event_id}")
async def get_event(event_id: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@app.put("/events/{event_id}")
async def update_event(
    event_id: str,
    event_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Only admin or event creator can update
    if current_user.role != UserRole.ADMIN and event.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Permission denied")

    for field, value in event_data.items():
        if hasattr(event, field):
            setattr(event, field, value)

    event.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(event)
    return event


# Event registration endpoints
@app.post("/events/{event_id}/register")
async def register_for_event(
    event_id: str,
    registration_data: EventRegistrationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    if event.status != EventStatus.OPEN:
        raise HTTPException(status_code=400, detail="Event registration is closed")

    # Check if already registered
    existing_registration = (
        db.query(EventRegistration)
        .filter(
            EventRegistration.event_id == event_id,
            EventRegistration.user_id == current_user.id,
        )
        .first()
    )

    if existing_registration:
        raise HTTPException(status_code=400, detail="Already registered for this event")

    # Check capacity
    current_participants = (
        db.query(EventRegistration)
        .filter(EventRegistration.event_id == event_id)
        .count()
    )
    if current_participants >= event.max_participants:
        raise HTTPException(status_code=400, detail="Event is full")

    new_registration = EventRegistration(
        **registration_data.dict(), user_id=current_user.id
    )

    db.add(new_registration)
    db.commit()
    db.refresh(new_registration)

    return {
        "message": "Registered successfully",
        "registration_id": new_registration.id,
    }


@app.get("/events/{event_id}/registrations")
async def get_event_registrations(
    event_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Only admin or event creator can view registrations
    if current_user.role != UserRole.ADMIN and event.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Permission denied")

    registrations = (
        db.query(EventRegistration).filter(EventRegistration.event_id == event_id).all()
    )
    return registrations


# Payment endpoints
@app.get("/payments")
async def get_payments(
    skip: int = 0,
    limit: int = 100,
    payment_type: Optional[str] = None,
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN:
        query = db.query(Payment).filter(Payment.user_id == current_user.id)
    else:
        query = db.query(Payment)

    if payment_type:
        query = query.filter(Payment.payment_type == payment_type)
    if status:
        query = query.filter(Payment.status == status)

    payments = query.offset(skip).limit(limit).all()
    return payments


@app.post("/payments")
async def create_payment(
    payment_data: PaymentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    new_payment = Payment(**payment_data.dict())
    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)
    return new_payment


@app.put("/payments/{payment_id}/status")
async def update_payment_status(
    payment_id: str,
    status: PaymentStatus,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    payment.status = status
    db.commit()

    return {"message": "Payment status updated successfully"}


# Sponsor endpoints
@app.get("/sponsors")
async def get_sponsors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    sponsors = (
        db.query(Sponsor)
        .filter(Sponsor.is_active == True)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return sponsors


@app.post("/sponsors")
async def create_sponsor(
    sponsor_data: SponsorCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    new_sponsor = Sponsor(**sponsor_data.dict())
    db.add(new_sponsor)
    db.commit()
    db.refresh(new_sponsor)
    return new_sponsor


@app.get("/sponsors/{sponsor_id}")
async def get_sponsor(sponsor_id: str, db: Session = Depends(get_db)):
    sponsor = db.query(Sponsor).filter(Sponsor.id == sponsor_id).first()
    if not sponsor:
        raise HTTPException(status_code=404, detail="Sponsor not found")
    return sponsor


@app.put("/sponsors/{sponsor_id}")
async def update_sponsor(
    sponsor_id: str,
    sponsor_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    sponsor = db.query(Sponsor).filter(Sponsor.id == sponsor_id).first()
    if not sponsor:
        raise HTTPException(status_code=404, detail="Sponsor not found")

    for field, value in sponsor_data.items():
        if hasattr(sponsor, field):
            setattr(sponsor, field, value)

    db.commit()
    db.refresh(sponsor)
    return sponsor


# Gallery endpoints
@app.get("/gallery")
async def get_gallery(
    skip: int = 0,
    limit: int = 100,
    media_type: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Gallery)

    if media_type:
        query = query.filter(Gallery.media_type == media_type)

    gallery_items = query.offset(skip).limit(limit).all()
    return gallery_items


@app.post("/gallery/upload")
async def upload_to_gallery(
    file: UploadFile = File(...),
    title: str = Form(...),
    caption: Optional[str] = Form(None),
    event_id: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Save file logic would go here
    # For now, just create database entry

    media_type = "photo" if file.content_type.startswith("image/") else "video"

    new_gallery_item = Gallery(
        title=title,
        filename=file.filename,
        media_type=media_type,
        caption=caption,
        event_id=event_id,
        uploaded_by=current_user.id,
    )

    db.add(new_gallery_item)
    db.commit()
    db.refresh(new_gallery_item)

    return {"message": "File uploaded successfully", "id": new_gallery_item.id}


# Statistics endpoints
@app.get("/stats/dashboard")
async def get_dashboard_stats(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    total_members = db.query(User).count()
    active_members = (
        db.query(User).filter(User.membership_status == MembershipStatus.ACTIVE).count()
    )
    pending_approvals = (
        db.query(User)
        .filter(User.membership_status == MembershipStatus.PENDING)
        .count()
    )
    total_events = db.query(Event).count()
    total_clubs = db.query(Club).filter(Club.is_active == True).count()
    total_revenue = (
        db.query(Payment).filter(Payment.status == PaymentStatus.COMPLETED).count()
    )

    return {
        "total_members": total_members,
        "active_members": active_members,
        "pending_approvals": pending_approvals,
        "total_events": total_events,
        "total_clubs": total_clubs,
        "total_revenue": total_revenue,
        "system_uptime": "99.8%",
    }


@app.get("/stats/financial")
async def get_financial_stats(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    # Get monthly financial data
    # This is simplified - in production you'd calculate actual monthly totals
    monthly_data = [
        {"month": "Jan", "revenue": 15200, "expenses": 2000, "net": 13200},
        {"month": "Feb", "revenue": 16800, "expenses": 1500, "net": 15300},
        {"month": "Mar", "revenue": 18200, "expenses": 3000, "net": 15200},
        {"month": "Apr", "revenue": 19500, "expenses": 2500, "net": 17000},
        {"month": "May", "revenue": 17800, "expenses": 1800, "net": 16000},
        {"month": "Jun", "revenue": 21400, "expenses": 3200, "net": 18200},
    ]

    return {"monthly_data": monthly_data}


# System settings endpoints
@app.get("/settings")
async def get_system_settings(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    settings = db.query(SystemSettings).first()
    if not settings:
        # Create default settings
        settings = SystemSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


@app.put("/settings")
async def update_system_settings(
    settings_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")

    settings = db.query(SystemSettings).first()
    if not settings:
        settings = SystemSettings()
        db.add(settings)

    for field, value in settings_data.items():
        if hasattr(settings, field):
            setattr(settings, field, value)

    settings.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(settings)

    return settings


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
