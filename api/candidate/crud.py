# crud.py
from sqlalchemy.orm import Session
from api.candidate.models import Candidate
from api.candidate.schemas import CandidateCreate

def create_candidate(db: Session, candidate: CandidateCreate):
    db_candidate = Candidate(**candidate.model_dump())
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    return db_candidate

def delete_candidate(db: Session, candidate_id: int):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if candidate:
        db.delete(candidate)
        db.commit()
        return True
    return False
