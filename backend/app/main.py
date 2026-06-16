from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import life, memory, pulse

app = FastAPI(title="广州城市仪表盘 API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://hobijj.github.io",
    ],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(life.router, prefix="/api/life", tags=["life"])
app.include_router(memory.router, prefix="/api/memory", tags=["memory"])
app.include_router(pulse.router, prefix="/api/pulse", tags=["pulse"])


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    # Auto-seed if DB is empty
    from .database import SessionLocal
    from .seed import seed_all
    db = SessionLocal()
    try:
        from .models import DataItem
        if db.query(DataItem).count() == 0:
            seed_all(db)
    finally:
        db.close()


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
