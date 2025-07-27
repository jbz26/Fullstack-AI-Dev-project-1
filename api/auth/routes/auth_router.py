from fastapi import APIRouter, Depends, HTTPException, Request , status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from auth.schemas import UserCreate, UserLogin
from auth.models import User
from database import get_db
from auth.jwt import create_access_token , get_current_user
from fastapi.responses import RedirectResponse
from typing import Any

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -------------------------
# 1. Đăng ký
# -------------------------
@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)) -> Any:
    # 1. Kiểm tra email đã được đăng ký chưa
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    existing_username = db.query(User).filter(User.user_name == user.user_name).first()
    print(user.user_name)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )
    
    # 2. Hash password
    hashed = pwd_context.hash(user.password)
    
    # 3. Tạo user mới
    new_user = User(
        email=user.email,
        hashed_password=hashed,
        full_name=user.full_name,
        user_name=user.user_name,
        location=user.location,
        provider=user.provider,
        google_id=user.google_id,
        avatar=f"https://i.pravatar.cc/150?u={user.email}"
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "msg": "User created successfully",
        "user_id": new_user.id
    }


# -------------------------
# 2. Đăng nhập truyền thống
# -------------------------
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not db_user.hashed_password or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": db_user.id})
    print({"access_token": token, "token_type": "bearer"})
    return {"access_token": token, "token_type": "bearer"}
