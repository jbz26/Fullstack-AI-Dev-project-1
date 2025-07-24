from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.database import engine
from app.auth.models import Base
from app.auth.routes.auth_router import router as auth_router
from app.auth.routes.oauth_router import router as oauth_router

from app.candidate.routers import router as candidate_router

from dotenv import load_dotenv
import os

load_dotenv()
sesion_key = os.getenv("SESSIONS_KEY", "default_session_key")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Chạy logic trước khi app bắt đầu nhận request
    print("🚀 App is starting up...")
    Base.metadata.create_all(bind=engine)  # Tạo bảng nếu chưa có
    yield
    # Chạy logic khi app sắp tắt
    print("🛑 App is shutting down...")

app = FastAPI(lifespan=lifespan)

app.add_middleware(SessionMiddleware, secret_key=os.getenv(sesion_key, "some-secret"))

origins = [
    "http://localhost:3000",  # Frontend dev
    "http://127.0.0.1:3000",
    "https://your-frontend-domain.com",  # Frontend deploy
]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,            # 👈 Cho phép các origin này gọi API
#     allow_credentials=True,
#     allow_methods=["*"],              # 👈 Cho phép mọi HTTP method
#     allow_headers=["*"],              # 👈 Cho phép mọi header
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả origin, dùng khi dev/test nội bộ
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(oauth_router, prefix="/oauth", tags=["OAuth"])
app.include_router(candidate_router, prefix="/candidates", tags=["Candidates"])

