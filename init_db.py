#!/usr/bin/env python3
"""
Database initialization script for DSRFA Backend API
Creates tables and inserts sample data for development
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta
import bcrypt

from main import (
    Base,
    User,
    Club,
    Event,
    Sponsor,
    SystemSettings,
    UserRole,
    MembershipStatus,
    EventStatus,
    EventCategory,
)
from config import settings


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def init_database():
    # Create database engine
    engine = create_engine(
        settings.DATABASE_URL,
        connect_args=(
            {"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
        ),
    )

    # Create all tables
    Base.metadata.create_all(bind=engine)

    # Create session
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    try:
        # Check if data already exists
        if db.query(User).first():
            print("Database already initialized with data.")
            return

        print("Initializing database with sample data...")

        # Create system settings
        settings_obj = SystemSettings(
            site_name="Davao-South Regional Football Association",
            maintenance_mode=False,
            registration_enabled=True,
            email_notifications=True,
            sms_notifications=False,
            auto_approval=False,
            membership_fee=150.0,
            session_timeout=30,
        )
        db.add(settings_obj)

        # Create sample clubs
        clubs = [
            Club(
                name="Davao Eagles FC",
                description="Premier football club in Davao City",
                location="Davao City",
                contact_email="info@davaoeagles.com",
                contact_phone="+63 82 123 4567",
                coach_name="Miguel Santos",
                coach_contact="+63 917 123 4567",
                home_venue="Davao Sports Complex",
                jersey_colors="Blue and White",
                founded_date=datetime(2015, 3, 15),
            ),
            Club(
                name="Mindanao United FC",
                description="Representing the strength of Mindanao football",
                location="General Santos City",
                contact_email="contact@mindanaoutd.com",
                contact_phone="+63 83 234 5678",
                coach_name="Roberto Cruz",
                coach_contact="+63 918 234 5678",
                home_venue="GenSan Sports Complex",
                jersey_colors="Red and Black",
                founded_date=datetime(2018, 7, 20),
            ),
            Club(
                name="Southern Lions FC",
                description="Youth development focused football club",
                location="Digos City",
                contact_email="info@southernlions.com",
                contact_phone="+63 82 345 6789",
                coach_name="Ana Reyes",
                coach_contact="+63 919 345 6789",
                home_venue="Digos City Stadium",
                jersey_colors="Gold and Green",
                founded_date=datetime(2020, 1, 10),
            ),
        ]

        for club in clubs:
            db.add(club)
        db.flush()  # Get club IDs

        # Create sample users
        users = [
            # Admin user
            User(
                name="Sarah Admin",
                email="admin@dsrfa.com",
                password_hash=hash_password("admin123"),
                phone="+63 917 555 0100",
                address="Davao City, Philippines",
                role=UserRole.ADMIN,
                membership_status=MembershipStatus.ACTIVE,
                membership_expiry=datetime.utcnow() + timedelta(days=365),
                bio="System administrator managing DSRFA digital infrastructure.",
            ),
            # Club Owner
            User(
                name="Mike Club Owner",
                email="owner@dsrfa.com",
                password_hash=hash_password("owner123"),
                phone="+63 917 555 0200",
                address="Davao City, Philippines",
                role=UserRole.CLUB_OWNER,
                club_id=clubs[0].id,
                membership_status=MembershipStatus.ACTIVE,
                membership_expiry=datetime.utcnow() + timedelta(days=365),
                bio="Owner and manager of Davao Eagles FC.",
            ),
            # Regular members
            User(
                name="Juan Carlos Santos",
                email="member@dsrfa.com",
                password_hash=hash_password("member123"),
                phone="+63 917 555 0123",
                address="Davao City, Philippines",
                role=UserRole.PLAYER,
                club_id=clubs[0].id,
                position="Midfielder",
                membership_status=MembershipStatus.ACTIVE,
                membership_expiry=datetime.utcnow() + timedelta(days=365),
                bio="Passionate football player with 5 years of experience.",
                emergency_contact="Maria Santos - +63 917 555 0124",
            ),
            User(
                name="Carlos Midfielder",
                email="carlos@dsrfa.com",
                password_hash=hash_password("carlos123"),
                phone="+63 918 555 0125",
                address="General Santos City, Philippines",
                role=UserRole.PLAYER,
                club_id=clubs[1].id,
                position="Midfielder",
                membership_status=MembershipStatus.ACTIVE,
                membership_expiry=datetime.utcnow() + timedelta(days=365),
                bio="Creative midfielder with excellent passing skills.",
                emergency_contact="Rosa Cruz - +63 918 555 0126",
            ),
            User(
                name="Diego Goalkeeper",
                email="diego@dsrfa.com",
                password_hash=hash_password("diego123"),
                phone="+63 919 555 0127",
                address="Digos City, Philippines",
                role=UserRole.PLAYER,
                club_id=clubs[2].id,
                position="Goalkeeper",
                membership_status=MembershipStatus.PENDING,
                membership_expiry=datetime.utcnow() + timedelta(days=365),
                bio="Reliable goalkeeper with quick reflexes.",
                emergency_contact="Luis Reyes - +63 919 555 0128",
            ),
        ]

        for user in users:
            db.add(user)
        db.flush()

        # Create sample events
        events = [
            Event(
                title="Regional Championship 2025",
                description="Annual regional championship tournament featuring teams from across Mindanao.",
                category=EventCategory.TOURNAMENT,
                date=datetime(2025, 7, 15, 9, 0),
                time="09:00",
                venue="Davao Sports Complex",
                location="Davao City",
                age_group="Senior",
                max_participants=64,
                registration_fee=2500.0,
                status=EventStatus.OPEN,
                organizer="DSRFA Tournament Committee",
                organizing_club_id=clubs[0].id,
                created_by=users[0].id,
            ),
            Event(
                title="Youth Championship Finals",
                description="Final matches for the youth championship series.",
                category=EventCategory.TOURNAMENT,
                date=datetime(2025, 6, 28, 14, 0),
                time="14:00",
                venue="Central Stadium",
                location="Davao City",
                age_group="Youth",
                max_participants=32,
                registration_fee=150.0,
                status=EventStatus.OPEN,
                organizer="DSRFA Youth Committee",
                organizing_club_id=clubs[0].id,
                created_by=users[1].id,
            ),
            Event(
                title="Summer Training Camp",
                description="Intensive summer training program for all skill levels.",
                category=EventCategory.TRAINING,
                date=datetime(2025, 7, 5, 9, 0),
                time="09:00",
                venue="Training Grounds",
                location="General Santos City",
                age_group="All Ages",
                max_participants=50,
                registration_fee=200.0,
                status=EventStatus.OPEN,
                organizer="Professional Coaches",
                organizing_club_id=clubs[1].id,
                created_by=users[0].id,
            ),
            Event(
                title="Referee Workshop",
                description="Training workshop for new and existing referees.",
                category=EventCategory.WORKSHOP,
                date=datetime(2025, 7, 12, 10, 0),
                time="10:00",
                venue="Conference Room",
                location="Davao City",
                age_group="Adult",
                max_participants=25,
                registration_fee=0.0,
                status=EventStatus.OPEN,
                organizer="DSRFA Referee Committee",
                created_by=users[0].id,
            ),
        ]

        for event in events:
            db.add(event)

        # Create sample sponsors
        sponsors = [
            Sponsor(
                name="Davao Chamber of Commerce",
                description="Supporting local football development and community engagement.",
                contact_person="Maria Gonzales",
                contact_email="maria@davaochamber.com",
                contact_phone="+63 82 123 9876",
                sponsorship_type="Gold",
                sponsorship_amount=50000.0,
                start_date=datetime(2025, 1, 1),
                end_date=datetime(2025, 12, 31),
            ),
            Sponsor(
                name="Mindanao Sports Equipment",
                description="Providing quality sports equipment and gear for teams.",
                contact_person="Roberto Martinez",
                contact_email="info@mindanaosports.com",
                contact_phone="+63 83 456 7890",
                sponsorship_type="Silver",
                sponsorship_amount=25000.0,
                start_date=datetime(2025, 1, 1),
                end_date=datetime(2025, 12, 31),
            ),
            Sponsor(
                name="GenSan Energy Drinks",
                description="Energizing athletes and supporting local sports.",
                contact_person="Lisa Santos",
                contact_email="lisa@gensanenergy.com",
                contact_phone="+63 83 789 0123",
                sponsorship_type="Bronze",
                sponsorship_amount=10000.0,
                start_date=datetime(2025, 1, 1),
                end_date=datetime(2025, 12, 31),
            ),
        ]

        for sponsor in sponsors:
            db.add(sponsor)

        # Commit all changes
        db.commit()

        print("✓ Database initialized successfully!")
        print("\nSample login credentials:")
        print("Admin: admin@dsrfa.com / admin123")
        print("Club Owner: owner@dsrfa.com / owner123")
        print("Member: member@dsrfa.com / member123")
        print("\nAPI will be available at: http://localhost:8000")
        print("Interactive docs: http://localhost:8000/docs")

    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    init_database()
