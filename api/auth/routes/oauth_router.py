from fastapi import APIRouter, Request, Depends, status
from fastapi.responses import RedirectResponse, HTMLResponse
from api.database import get_db
from authlib.integrations.starlette_client import OAuth
from api.auth.jwt import create_access_token
from api.auth.models import User
from sqlalchemy.orm import Session
import os


oauth = OAuth()
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

router = APIRouter()

@router.get(
    "/google/login",
    summary="Đăng nhập với Google",
    description="Chuyển hướng người dùng đến trang xác thực Google OAuth2 để bắt đầu quá trình đăng nhập.",
    tags=["OAuth"],
    response_class=RedirectResponse,
    status_code=status.HTTP_307_TEMPORARY_REDIRECT,
    responses={
        status.HTTP_307_TEMPORARY_REDIRECT: {
            "description": "Redirect đến Google OAuth2."
        }
    }
)
async def login_with_google(request: Request):
    redirect_uri = request.url_for("auth_google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get(
    "/google/callback",
    summary="Xử lý callback từ Google",
    description="Nhận mã xác thực từ Google, kiểm tra hoặc tạo tài khoản người dùng, và trả về access token JWT.",
    tags=["OAuth"],
    response_model=dict,
    responses={
        200: {
            "description": "Đăng nhập thành công, trả về access token.",
            "content": {
                "application/json": {
                    "example": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "token_type": "bearer"
                    }
                }
            }
        },
        400: {
            "description": "Lỗi xác thực với Google."
        }
    },
    name="auth_google_callback"
)
async def auth_google_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    
    nonce = request.query_params.get("nonce")
    user_info = await oauth.google.parse_id_token(token, nonce)

    
    print("User info:", user_info)
    email = user_info.get("email")
    full_name = user_info.get("name")
    google_id = user_info.get("sub")

    # Kiểm tra hoặc tạo user
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            email=email,
            full_name=full_name,
            provider="google",
            google_id=google_id
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token({"sub": user.id})

    html = f"""
    <script>
      window.opener.postMessage({{
        access_token: "{access_token}",
        token_type: "Bearer"
      }}, "{FRONTEND_URL}");
      window.close();
    </script>
    """
    return HTMLResponse(content=html)
