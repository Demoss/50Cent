package query

import "time"

type GetLoanByIDResponse struct {
	CreditSum             float64 `json:"CreditSum"`
	CreditTitle           string  `json:"CreditTitle"`
	CreditDescription     string  `json:"CreditDescription"`
	CreditTerm            uint    `json:"CreditTerm"`
	CreditRate            float64 `json:"CreditRate"`
	ReturnedInvestorMoney float64 `json:"ReturnedInvestorMoney"`
}

type GetConsumerLoansResponse struct {
	ID             uint      `json:"ID"`
	CreditSum      float64   `json:"credit_sum"`
	CreditTitle    string    `json:"credit_title"`
	CreditTerm     uint      `json:"credit_term"`
	InvestorID     uint      `json:"investor_id"`
	ReturnedAmount uint      `json:"returned_amount"`
	AcceptedAt     time.Time `json:"accepted_at"`
}

type GetContrOffersResponse struct {
	ID            uint    `json:"ID"`
	CreditSum     float64 `json:"credit_sum"`
	CreditTitle   string  `json:"credit_title"`
	CreditRate    float64 `json:"credit_rate"`
	CreditNewRate float64 `json:"credit_new_rate"`
	CreditTerm    uint    `json:"credit_term"`
	CreditNewTerm uint    `json:"credit_new_term"`
}
type GetAllUnOfferedLoansResponse struct {
	ID          uint    `json:"ID"`
	CreditSum   float64 `json:"credit_sum"`
	CreditTitle string  `json:"credit_title"`
	CreditRate  float64 `json:"credit_rate"`
	CreditTerm  uint    `json:"credit_term"`
}
