from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, time
from enum import Enum

class CandidateType(str, Enum):
    Applicant = "Applicant"
    Employee = "Employee"
    Intern = "Intern"

class CandidateCreate(BaseModel):
    type: CandidateType  # Applicant / Employee / Intern
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
    hr_id: int  # ✅ khóa ngoại liên kết với tài khoản User

    

class CandidateResponse(BaseModel):
    # ...
    candidate_type: CandidateType  # hoặc field nào đang gây lỗi

    class Config:
        arbitrary_types_allowed = True  # ✅ thêm dòng này
