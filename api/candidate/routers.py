# main.py or routes/candidates.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import get_db
from api.candidate.crud import create_candidate, delete_candidate
from api.candidate.schemas import CandidateCreate, CandidateResponse

router = APIRouter(prefix="/candidates", tags=["Candidates"])

@router.post("/", response_model=CandidateResponse)
def add_candidate(candidate: CandidateCreate, db: Session = Depends(get_db)):
    return create_candidate(db, candidate)

@router.delete("/{candidate_id}", status_code=204)
def remove_candidate(candidate_id: int, db: Session = Depends(get_db)):
    success = delete_candidate(db, candidate_id)
    if not success:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return
