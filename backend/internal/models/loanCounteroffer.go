package models

import (
	"gorm.io/gorm"
)

type LoanCounteroffer struct {
	gorm.Model
	CreditTerm uint    `gorm:"type:uint; not null"`
	CreditRate float64 `gorm:"type:float; not null"`
	LoanID     uint
	Loan       Loan
}

type LoanCounterofferDetails struct {
    ID                uint
    CreditSum         float64
    CreditTitle       string
    CreditTerm        uint
    CreditRate        float64
    NewCreditTerm     uint
    NewCreditRate     float64
}
