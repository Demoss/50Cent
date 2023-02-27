package models

import (
	"time"

	"gorm.io/gorm"
)

type Loan struct {
	gorm.Model
	CreditSum         float64 `gorm:"type:float; not null"`
	CreditTitle       string  `gorm:"type:varchar(100); not null"`
	CreditDescription string  `gorm:"type:varchar(1000)"`
	CreditTerm        uint    `gorm:"type:uint; not null"`
	CreditRate        float64 `gorm:"type:float; not null"`
	ReturnedAmount    uint    `gorm:"type:uint; default:0"`
	IsReturned        bool    `gorm:"type:boolean; default:false"`
	IsAccepted        bool    `gorm:"type:boolean; default:false"`
	AcceptedAt        time.Time
	ConsumerID        uint
	Consumer          Consumer
	InvestorID        *uint
	Investor          Investor
}

type LoanWithConsumer struct {
	gorm.Model
	CreditSum         float64 `gorm:"type:float; not null"`
	CreditTitle       string  `gorm:"type:varchar(100); not null"`
	CreditDescription string  `gorm:"type:varchar(1000)"`
	CreditTerm        uint    `gorm:"type:uint; not null"`
	CreditRate        float64 `gorm:"type:float; not null"`
	ReturnedAmount    uint    `gorm:"type:uint; default:0"`
	IsReturned        bool    `gorm:"type:boolean; default:false"`
	IsAccepted        bool    `gorm:"type:boolean; default:false"`
	AcceptedAt        time.Time
	ConsumerID        uint
	InvestorID        uint
	Name              string `gorm:"type:varchar(100)"`
	Surname           string `gorm:"type:varchar(100)"`
}

type GetLoanByInvestorID struct {
	gorm.Model
	CreditSum         float64   `json:"CreditSum"`
	CreditTitle       string    `json:"CreditTitle"`
	CreditDescription string    `json:"CreditDescription"`
	CreditTerm        uint      `json:"CreditTerm"`
	CreditRate        float64   `json:"CreditRate"`
	ReturnedAmount    uint      `json:"ReturnedAmount"`
	IsReturned        bool      `json:"IsReturned"`
	IsAccepted        bool      `json:"IsAccepted"`
	AcceptedAt        time.Time `json:"AcceptedAt"`
	ConsumerID        uint      `json:"ConsumerID"`
	InvestorID        uint      `json:"InvestorID"`
	Name              string    `json:"Consumer_name"`
	Surname           string    `json:"Consumer_surname"`
}
