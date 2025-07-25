# crud.py
from sqlalchemy.orm import Session
from api.candidate.models import Candidate
from api.candidate.schemas import CandidateCreate
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
def create_candidate(db: Session, candidate_data: CandidateCreate):
    # Check if email exists
    existing = db.query(Candidate).filter(Candidate.email == candidate_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    candidate = Candidate(**candidate_data.model_dump())
    db.add(candidate)
    try:
        db.commit()
        db.refresh(candidate)
        return candidate
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Candidate creation failed due to unique constraint")

def delete_candidate(db: Session, candidate_id: int):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if candidate:
        db.delete(candidate)
        db.commit()
        return True
    return False
