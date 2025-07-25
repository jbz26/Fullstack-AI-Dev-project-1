from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from api.models.base import Base

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, default="Applicant")
    name = Column(String, nullable=False)
    application_date = Column(Date)
    position = Column(String)
    email = Column(String, unique=True, index=True)
    phone_number = Column(String)
    status = Column(String)
    source = Column(String)
    interview_date = Column(Date)
    interview_time = Column(Time)
    interviewer = Column(String)
    feedback = Column(String)
    notes = Column(String)
    hr_id = Column(Integer, ForeignKey("users.id"))  # ✅ khóa ngoại
    hr = relationship("User", back_populates="candidates")  # ORM relation

