# app/schemas/user.py
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str
    is_admin: bool = False


class LoginRequest(BaseModel):
    username: str
    password: str
