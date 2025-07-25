from api.auth.jwt import get_current_user
from api.database import get_user_data
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import get_db
from api.auth.models import User 
from api.auth.schemas import UserResponse

router = APIRouter( tags=["Data"])
@router.get("/user", response_model=UserResponse)
def get_user_method(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get the current user's data.
    """
    print(f"Fetching data for user: {current_user.id}")
    user_data = get_user_data(current_user.id, db)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user_data