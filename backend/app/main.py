# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.auth import router as auth_router
from app.api.routes.product import router as product_router
from app.db.base import Base
from app.db.session import engine
from fastapi.staticfiles import StaticFiles

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()


# CORS configuration
origins = [
    "http://localhost:5173/admin",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth")
app.include_router(product_router, prefix="/products")