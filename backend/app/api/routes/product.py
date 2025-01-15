# app/api/routes/product.py
from fastapi import APIRouter, Depends, HTTPException, Form
from typing import Optional
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_admin
from app.api.deps import get_current_user

from app.crud.product import (
    get_product, get_products, create_product, update_product, delete_product,toggle_favorite
)
from app.schemas.product import ProductCreate, ProductUpdate ,ProductRead

router = APIRouter()

@router.get("/products/", response_model=list[ProductRead])
def read_products(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    return get_products(db=db)
    

@router.get("/products/{product_id}", response_model=ProductRead)
def read_product(product_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_product = get_product(db=db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@router.post("/products/", response_model=ProductCreate)
def create_new_product(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category: str = Form(...),
    is_favorite: bool = Form(False),
    image: str = Form(None),
    db: Session = Depends(get_db),
    current_admin: dict = Depends(get_current_admin),
):
    product = ProductCreate(
        name=name,
        description=description,
        price=price,
        category=category,
        is_favorite=is_favorite,
        image=image,
    )
    return create_product(db=db, product=product)

@router.put("/products/{product_id}", response_model=ProductRead)
def update_existing_product(
    product_id: int,
    name: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    price: Optional[float] = Form(None),
    category: Optional[str] = Form(None),
    is_favorite: Optional[bool] = Form(None),
    image: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    current_admin: dict = Depends(get_current_admin),
):
    product = ProductUpdate(
        name=name,
        description=description,
        price=price,
        category=category,
        is_favorite=is_favorite,
        image=image,
    )
    return update_product(db=db, product_id=product_id, product=product)

@router.put("/productsfav/{product_id}", response_model=ProductRead)
def toggle_favorite_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),  # Allow normal users to pin
):
    # Toggle the is_favorite field using the CRUD function
    updated_product = toggle_favorite(db=db, product_id=product_id)

    if updated_product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated_product

@router.delete("/products/{product_id}", response_model=ProductRead)
def delete_existing_product(product_id: int, db: Session = Depends(get_db), current_admin: dict = Depends(get_current_admin)):
    db_product = delete_product(db=db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product