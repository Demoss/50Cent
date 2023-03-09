package domain

type User struct {
	ID           uint
	Password     string
	IsVerified   bool
	Email        string
	Phone        string
	Role         string
	RefreshToken string
}

type GetMeUser struct {
	ID    uint   `json:"id"  gorm:"primaryKey"`
	Email string `json:"email"`
	Phone string `json:"phone"`
	Role  string `json:"role"`
}
