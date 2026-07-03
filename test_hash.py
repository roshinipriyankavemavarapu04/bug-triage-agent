from backend.auth.password import hash_password, verify_password

password = "admin123"

hashed = hash_password(password)

print("Original:", password)
print("Hashed :", hashed)

print(
    verify_password(
        "admin123",
        hashed
    )
)