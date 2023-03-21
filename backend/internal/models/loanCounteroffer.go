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

type CounterOffersFromLoans struct {
	gorm.Model
	CreditTerm uint    `gorm:"type:uint; not null"`
	CreditRate float64 `gorm:"type:float; not null"`
	LoanID     uint
	CreditTitle       string  `gorm:"type:varchar(100); not null"`
	ConsumerID        uint      `json:"ConsumerID"`
}

type LoanCounterofferDetails struct {
    ID                uint
    CreditSum         float64
    CreditTitle       string
    CreditTerm        uint
    CreditRate        float64
    InvestorID        uint
    NewCreditTerm     uint
    NewCreditRate     float64
}
