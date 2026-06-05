from fastapi import APIRouter, File, UploadFile

router = APIRouter()


@router.post("/separate")
async def separate_audio(file: UploadFile = File(...)) -> dict[str, str]:
    """音轨分离接口 (placeholder)"""
    return {
        "status": "not_implemented",
        "message": "音轨分离功能开发中",
        "filename": file.filename,
    }
