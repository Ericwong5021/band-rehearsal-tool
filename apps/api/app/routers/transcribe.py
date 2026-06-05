from fastapi import APIRouter, File, UploadFile

router = APIRouter()


@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)) -> dict[str, str]:
    """AI识谱转写接口 (placeholder)"""
    return {
        "status": "not_implemented",
        "message": "AI识谱功能开发中",
        "filename": file.filename,
    }
