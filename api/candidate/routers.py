from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import get_db
from api.candidate.crud import create_candidate, delete_candidate
from api.candidate.schemas import CandidateCreate, CandidateResponse
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from api.auth.jwt import get_current_user
from api.auth.models import User
router = APIRouter( tags=["Candidates"])

@router.post(
    path = "/add",
    response_model=CandidateResponse,
    summary="Tạo ứng viên mới",
    description="""
Tạo một ứng viên mới với các thông tin như họ tên, vị trí ứng tuyển, email, số điện thoại, ngày ứng tuyển,...
Dữ liệu bắt buộc: `type`, `name`, `hr_id`.
""",
    responses={
        200: {
            "description": "Ứng viên được tạo thành công.",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "type": "Applicant",
                        "name": "Nguyễn Văn A",
                        "application_date": "2025-07-24",
                        "position": "Backend Developer",
                        "email": "a.nguyen@example.com",
                        "phone_number": "0912345678",
                        "status": "Pending",
                        "source": "LinkedIn",
                        "interview_date": "2025-07-27",
                        "interview_time": "09:00:00",
                        "interviewer": "Trần B",
                        "feedback": "Có tiềm năng",
                        "notes": "Ưu tiên gọi lại",
                        
                        "hr_id": 3
                    }
                }
            }
        },
        422: {
            "description": "Dữ liệu đầu vào không hợp lệ."
        }
    }
)
def add_candidate(candidate: CandidateCreate, db: Session = Depends(get_db)):
    return create_candidate(db, candidate)


@router.delete(
    "/delete{candidate_id}",
    status_code=204,
    summary="Xoá ứng viên",
    description="Xoá một ứng viên khỏi cơ sở dữ liệu dựa trên ID. Nếu không tìm thấy ứng viên, trả về lỗi 404.",
    responses={
        204: {"description": "Xoá thành công."},
        404: {"description": "Không tìm thấy ứng viên với ID đã cho."}
    }
)
def remove_candidate(candidate_id: int, db: Session = Depends(get_db)):
    success = delete_candidate(db, candidate_id)
    if not success:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return
