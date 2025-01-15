# app/models/product.py
from sqlalchemy import Column, Integer, String, Float, Boolean
from app.db.base import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    is_favorite = Column(Boolean, default=False)
    image = Column(String, nullable=True)