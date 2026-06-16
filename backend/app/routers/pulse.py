from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ._helper import get_all_for_module, get_one

router = APIRouter()


@router.get("")
def list_pulse(db: Session = Depends(get_db)):
    return get_all_for_module(db, "pulse")


@router.get("/{item_id}")
def get_pulse(item_id: str, db: Session = Depends(get_db)):
    return get_one(db, "pulse", item_id)
