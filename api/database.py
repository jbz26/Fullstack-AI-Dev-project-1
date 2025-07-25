from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from api.auth.models import User
from sqlalchemy.orm import Session

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
def get_user_data(user_id: int, db: Session ):
    return db.query(User).filter(User.id == user_id).first()

try:
    with engine.connect() as conn:
        print("✅ Connected to the database successfully!")
except Exception as e:
    print(f"❌ Database connection failed: {e}")


