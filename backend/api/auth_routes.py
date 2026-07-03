from fastapi import APIRouter, HTTPException

from backend.database.database import SessionLocal

from backend.schemas.auth_schema import (
    RegisterRequest,
    LoginRequest,
    TokenResponse
)

from backend.crud.user_crud import (
    create_user,
    get_user_by_email
)

from backend.auth.password import verify_password

from backend.auth.jwt_handler import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: RegisterRequest):

    db = SessionLocal()

    try:

        existing = get_user_by_email(
            db,
            user.email
        )

        if existing:

            raise HTTPException(
                status_code=400,
                detail="Email already exists."
            )

        create_user(
            db,
            user.username,
            user.email,
            user.password
        )

        return {
            "message": "User registered successfully."
        }

    finally:

        db.close()


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(user: LoginRequest):

    db = SessionLocal()

    try:

        db_user = get_user_by_email(
            db,
            user.email
        )

        if db_user is None:

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password."
            )

        if not verify_password(
            user.password,
            db_user.password
        ):

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password."
            )

        token = create_access_token(
            {
                "sub": db_user.email
            }
        )

        return {

            "access_token": token,

            "token_type": "bearer"

        }

    finally:

        db.close()