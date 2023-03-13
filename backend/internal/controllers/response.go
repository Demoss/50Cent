package controllers

import (
	"50Cent/backend/internal/domain"
	"log"

	"github.com/gin-gonic/gin"
)

type errorResponse struct {
	Message string `json:"message"`
}

type statusResponse struct {
	Status string `json:"status"`
}

type otpResponse struct {
	Code []byte `json:"code"`
}

func newErrorResponse(c *gin.Context, statusCode int, message string) {
	log.Println(message)
	c.AbortWithStatusJSON(statusCode, errorResponse{message})
}

type LoginResponse struct {
	Token    string   `json:"token"`
	TypesMFA []string `json:"typesMFA"`
}

type LoginConfirmResponse struct {
	Token   string `json:"token"`
	Refresh string `json:"refresh"`
}

type addPaymentResponse struct {
	URL string `json:"url"`
}

type stripeURLResponse struct {
	URL string `json:"url"`
}

type transactionsResponse struct {
	Transactions []domain.Transaction `json:"transactions"`
}

type balancesResponse struct {
	Balances []domain.Balance `json:"balances"`
}

type payoutsArrayResponse struct {
	Payouts []domain.Payout `json:"payouts"`
}

type payoutResponse struct {
	Payouts float64 `json:"payouts"`
}
type loanCounteroffersResponse struct {
	Counteroffers []domain.LoanCounteroffer `json:"loan_counteroffers"`
}

type consumerUpdatingResponse struct {
	Name         string `json:"Name"`
	Surname      string `json:"Surname"`
	MiddleName   string `json:"MiddleName"`
	Photo        string `json:"Photo"`
	IDFile       string `json:"IDFile"`
	WorkFile     string `json:"WorkFile"`
	PropertyFile string `json:"PropertyFile"`
}

type investorUpdatingResponse struct {
	Name       string `json:"Name"`
	Surname    string `json:"Surname"`
	MiddleName string `json:"MiddleName"`
	Photo      string `json:"Photo"`
	IDFile     string `json:"IDFile"`
}

type loansByInvestorIDResponse struct {
	Loans []domain.LoanWithConsumer `json:"loans"`
}

type currentInvestorResponse struct {
	ID          int     `json:"ID"`
	Name        string  `json:"Name"`
	Surname     string  `json:"Surname"`
	MiddleName  string  `json:"MiddleName"`
	UserEmail   string  `json:"UserEmail"`
	Balance     float64 `json:"Balance"`
	Role        string  `json:"Role"`
	IsConfirmed bool    `json:"IsConfirmed"`
}

type currentConsumerResponse struct {
	ID          int     `json:"ID"`
	Name        string  `json:"Name"`
	Surname     string  `json:"Surname"`
	MiddleName  string  `json:"MiddleName"`
	UserEmail   string  `json:"UserEmail"`
	Balance     float64 `json:"Balance"`
	Role        string  `json:"Role"`
	IsConfirmed bool    `json:"IsConfirmed"`
}
