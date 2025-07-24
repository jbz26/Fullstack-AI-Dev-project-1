from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.schemas import UserCreate, UserLogin
from app.models import User
from app.database import SessionLocal
from app.auth.jwt import create_access_token
from app.auth.oauth import oauth  # oauth instance from authlib.integrations.starlette_client
from fastapi.responses import RedirectResponse

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------
# 1. Đăng ký
# -------------------------
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = pwd_context.hash(user.password)
    
    new_user = User(
        email=user.email,
        hashed_password=hashed,
        full_name=user.full_name,
        user_name=user.user_name,
        location=user.location,
        provider=user.provider,
        google_id=user.google_id
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"msg": "User created", "user_id": new_user.id}


# -------------------------
# 2. Đăng nhập truyền thống
# -------------------------
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not db_user.hashed_password or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}
