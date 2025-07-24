from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    full_name = Column(String)
    user_name = Column(String, unique=True, index=True, nullable=True)
    location = Column(String, nullable=True)
    provider = Column(String, default="local")
    google_id = Column(String, nullable=True)
    candidates = relationship("Candidate", back_populates="hr")  # ← đây là chiều ngược lại

