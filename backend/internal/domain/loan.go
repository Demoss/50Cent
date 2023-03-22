package domain

import "time"

type Loan struct {
	ID                uint
	CreditSum         float64
	CreditTitle       string
	CreditDescription string
	CreditTerm        uint
	CreditRate        float64
	ReturnedAmount    uint
	IsReturned        bool
	IsAccepted        bool
	AcceptedAt        time.Time
	ConsumerID        uint
	InvestorID        uint
}

type LoanResponse struct {
	TotalPages float64
	Data       []Loan
}

type CounterOffers struct {
	ID            uint
	ConsumerID    uint
	CreditSum     float64
	CreditTitle   string
	CreditRate    float64
	CreditNewRate float64
	CreditTerm    uint
	CreditNewTerm uint
	LoanID uint
}

type LoanWithConsumer struct {
	ID                uint
	CreditSum         float64
	CreditTitle       string
	CreditDescription string
	CreditTerm        uint
	CreditRate        float64
	ReturnedAmount    float64
	IsReturned        bool
	IsAccepted        bool
	LatestPaymount    time.Time
	ConsumerID        uint
	InvestorID        uint
	ConsumerName      string
	ConsumerSurname   string
}
