# app/schemas/product.py
from pydantic import BaseModel
from typing import Optional

# Base schema without id
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    is_favorite: bool = False
    image: Optional[str] = None

# Schema for creating a product (no id required)
class ProductCreate(ProductBase):
    pass

# Schema for reading a product (includes id)
class ProductRead(ProductBase):
    id: int

# Schema for updating a product
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    is_favorite: Optional[bool] = None
    image: Optional[str] = None