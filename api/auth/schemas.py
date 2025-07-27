from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str = ""
    user_name: str = ""
    location: str = ""
    provider: str = "credentials"
    google_id: str | None = None
    avatar: str | None = None  # Thêm trường avatar nếu cần
class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    user_name: Optional[str] = None
    location: Optional[str] = None
    provider: str
    google_id: str | None = None  # nếu có thể là None
    avatar: Optional[str] = None  # Thêm trường avatar nếu cần

    class Config:
        orm_mode = True
