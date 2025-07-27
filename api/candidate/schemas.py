from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, time
from enum import Enum

class CandidateType(str, Enum):
    Applicant = "Applicant"
    Employee = "Employee"
    Intern = "Intern"

class CandidateCreate(BaseModel):
    type: CandidateType
    name: str
    dob: Optional[date]  # 🆕 thêm vào
    email: Optional[EmailStr]
    phone_number: Optional[str]
    position: Optional[str]
    experience: Optional[str]  # 🆕 thêm vào
    skills: Optional[str]      # 🆕 thêm vào
    status: Optional[str]
    source: Optional[str]
    application_date: Optional[date]
    interview_date: Optional[date]
    interview_time: Optional[time]
    interviewer: Optional[str]
    feedback: Optional[str]
    notes: Optional[str]

class CandidateWithHR(CandidateCreate):
    hr_id: int  # Thêm trường HR ID để liên kết với người dùng hiện 
    
    class Config:
        from_attributes = True
    

class CandidateResponse(BaseModel):
    id: int
    type: CandidateType
    name: str
    application_date: Optional[date]    
    position: Optional[str]
    email: Optional[EmailStr]
    phone_number: Optional[str]
    status: Optional[str]
    source: Optional[str]
    interview_date: Optional[date]
    interview_time: Optional[time]
    interviewer: Optional[str]
    feedback: Optional[str]
    notes: Optional[str]
    hr_id: int
    dob: Optional[date]  # 🆕 thêm vào
    experience: Optional[str]  # 🆕 thêm vào
    skills: Optional[str]      # 🆕 thêm vào

    class Config:
        from_attributes = True  # dùng khi trả về từ SQLAlchemy model

