from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ._helper import get_all_for_module, get_one

router = APIRouter()


@router.get("")
def list_life(db: Session = Depends(get_db)):
    return get_all_for_module(db, "life")


@router.get("/{item_id}")
def get_life(item_id: str, db: Session = Depends(get_db)):
    return get_one(db, "life", item_id)
