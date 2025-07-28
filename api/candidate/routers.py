from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import get_db
from api.candidate.crud import create_candidate, delete_candidate
from api.candidate.schemas import CandidateCreate, CandidateResponse, CandidateWithHR
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from api.auth.jwt import get_current_user
from api.auth.schemas import UserResponse
from api.candidate.models import Candidate
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
def add_candidate(candidate: CandidateCreate, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    candidate_with_hr = CandidateWithHR(**candidate.model_dump(), hr_id=current_user.id)
    return create_candidate(db, candidate_with_hr)


@router.delete(
    path="/delete/{candidate_id}",
    summary="Xóa ứng viên",
    description="""Xóa một ứng viên khỏi hệ thống dựa vào `candidate_id`.\n
    Chỉ những người dùng đã xác thực (có access token hợp lệ) mới được phép thực hiện thao tác này.\n
    Trả về mã lỗi `404` nếu không tìm thấy ứng viên.
    """,
        responses={
            200: {
                "description": "Xóa ứng viên thành công.",
                "content": {
                    "application/json": {
                        "example": {
                            "message": "Candidate deleted successfully"
                        }
                    }
                }
            },
            401: {
                "description": "Không có quyền truy cập (token không hợp lệ hoặc không gửi)."
            },
            404: {
                "description": "Không tìm thấy ứng viên với `candidate_id` đã cung cấp."
            }
        }
    )
def remove_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    """
    Xóa ứng viên với ID cụ thể.

    - **candidate_id**: ID của ứng viên cần xóa
    - **db**: phiên làm việc với cơ sở dữ liệu
    - **current_user**: người dùng hiện tại (đã xác thực)
    """
    print(candidate_id)
    delete_candidate(db, candidate_id)
    return {"message": "Candidate deleted successfully"}

@router.get(
    path="/find_candidate/{candidate_id}",
    response_model=CandidateResponse,
    summary="Lấy thông tin ứng viên theo ID",
    description="Lấy thông tin chi tiết của một ứng viên dựa trên `candidate_id`.",
    responses={
        200: {
            "description": "Thông tin ứng viên được trả về thành công.",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "type": "Applicant",
                        "name": "Nguyễn Văn A",
                        "application_date": "2025-07-24",
                        "position": "Backend Developer",
                        "email": "example@gmai.com",
                        "phone_number": "0912345678",
                        "status": "Pending",
                        "source": "LinkedIn",
                        "interview_date": "2025-07-27",
                        "interview_time": "09:00:00",
                        "interviewer": "Trần B",
                        "feedback": "Có tiềm năng",
                        "notes": "Ưu tiên gọi lại",
                        "hr_id": 3,
                    }
                }
            }
        },
        404: {
            "description": "Không tìm thấy ứng viên với `candidate_id` đã cung cấp."
        }
    }
)
def get_candidate_by_id(candidate_id: int, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    """
    Lấy thông tin ứng viên theo ID.

    - **candidate_id**: ID của ứng viên cần lấy thông tin
    - **db**: phiên làm việc với cơ sở dữ liệu
    - **current_user**: người dùng hiện tại (đã xác thực)
    """
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    # Phân quyền: chỉ HR tương ứng mới được xem
    if candidate.hr_id != current_user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this candidate")
    
    return candidate

@router.get(
    path="/get_all",
    response_model=list[CandidateResponse],
    summary="Lấy danh sách tất cả ứng viên",
    description="Lấy danh sách tất cả ứng viên đã được tạo bởi người dùng hiện tại (HR).",
    responses={
        200: {
            "description": "Danh sách ứng viên được trả về thành công.",
            "content": {
                "application/json": {
                    "example": [
                        {
                            "id": 1,
                            "type": "Applicant",
                            "name": "Nguyễn Văn A",
                            "application_date": "2025-07-24",
                            "position": "Backend Developer",
                            "email": "example@gmail.com",
                            "phone_number": "0912345678",
                            "status": "Pending",
                            "source": "LinkedIn",
                            "interview_date": "2025-07-27",
                            "interview_time": "09:00:00",
                            "interviewer": "Trần B",
                            "feedback": "Có tiềm năng",
                            "notes": "Ưu tiên gọi lại",
                            "hr_id": 3
                        },
                        {
                            "id": 2,
                            "type": "Employee",
                            "name": "Trần Thị B",
                            "application_date": "2025-07-25",
                            "position": "Frontend Developer",
                            "email": "2@gmail.com",
                            "phone_number": "0987654321",
                            "status": "Interviewed",
                            "source": "Referral",
                            "interview_date": "2025-07-28",
                            "interview_time": "10:00:00",
                            "interviewer": "Nguyễn C",
                            "feedback": "Phù hợp",
                            "notes": "Cần đào tạo thêm",
                            "hr_id": 3
                        }
                    ]
                }
            }
        },
        404: {
            "description": "Không tìm thấy ứng viên nào cho HR hiện tại."
        }
    }
)
def get_all_candidates(db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    """
    Lấy danh sách tất cả ứng viên.

    - **db**: phiên làm việc với cơ sở dữ liệu
    - **current_user**: người dùng hiện tại (đã xác thực)
    """
    candidates = db.query(Candidate).filter(Candidate.hr_id == current_user.id).all()
    for candidate in candidates:
        print(candidate.id)
    if not candidates:
        return []
    # Lọc ứng viên theo HR ID của người dùng hiện tại
    # ✅ Đảm bảo chỉ lấy ứng viên của HR hiện tại   
    return candidates


@router.put("/{candidate_id}", response_model=CandidateResponse, summary="Cập nhật thông tin ứng viên")
def update_candidate(candidate_id: int, candidate_data: CandidateWithHR, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    for field, value in candidate_data.model_dump(exclude_unset=True).items():
        setattr(candidate, field, value)

    db.commit()
    db.refresh(candidate)
    return candidate