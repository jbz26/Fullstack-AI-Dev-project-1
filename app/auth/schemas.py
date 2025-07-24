from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str = ""
    user_name: str = ""
    location: str = ""
    provider: str = "credentials"
    google_id: str | None = None

class UserLogin(BaseModel):
    email: str
    password: str
