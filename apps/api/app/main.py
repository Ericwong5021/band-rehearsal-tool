from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, separate, transcribe

app = FastAPI(
    title="乐队排练辅助工具 API",
    description="AI识谱、音轨分离等后端服务",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(transcribe.router, prefix="/api", tags=["transcribe"])
app.include_router(separate.router, prefix="/api", tags=["separate"])


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "乐队排练辅助工具 API", "version": "0.1.0"}
