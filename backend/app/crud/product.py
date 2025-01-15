# app/crud/product.py

from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate




def get_product(db: Session, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        return None
    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "is_favorite": product.is_favorite,
        "image": product.image,
    }

def get_products(db: Session):
    products = db.query(Product).all()
    return [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "category": product.category,
            "is_favorite": product.is_favorite,
            "image": product.image,
        }
        for product in products
    ]

def create_product(db: Session, product: ProductCreate):
    db_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        category=product.category,
        is_favorite=product.is_favorite,
        image=product.image,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return {
        "id": db_product.id,
        "name": db_product.name,
        "description": db_product.description,
        "price": db_product.price,
        "category": db_product.category,
        "is_favorite": db_product.is_favorite,
        "image": db_product.image,
    }

def update_product(db: Session, product_id: int, product: ProductUpdate):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        for key, value in product.dict(exclude_unset=True).items():
            if value is not None:  # Only update fields that are not None
                setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
        return {
            "id": db_product.id,
            "name": db_product.name,
            "description": db_product.description,
            "price": db_product.price,
            "category": db_product.category,
            "is_favorite": db_product.is_favorite,
            "image": db_product.image,
        }
    return None

def toggle_favorite(db: Session, product_id: int):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        # Toggle the is_favorite field
        db_product.is_favorite = not db_product.is_favorite
        db.commit()
        db.refresh(db_product)
        return {
            "id": db_product.id,
            "name": db_product.name,
            "description": db_product.description,
            "price": db_product.price,
            "category": db_product.category,
            "is_favorite": db_product.is_favorite,
            "image": db_product.image,
        }
    return None

def delete_product(db: Session, product_id: int):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return {
            "id": db_product.id,
            "name": db_product.name,
            "description": db_product.description,
            "price": db_product.price,
            "category": db_product.category,
            "is_favorite": db_product.is_favorite,
            "image": db_product.image,
        }
    return None