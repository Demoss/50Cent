package controllers

import (
	"50Cent/backend/internal/command"
	"50Cent/backend/internal/domain"
	"50Cent/backend/internal/helper"
	"50Cent/backend/internal/models"
	"fmt"

	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// @Summary                     Get Balance history for investor
// @Tags                        Investor
// @Description                 Get List of balance snapshots
// @ID                          getBalanceHistoryInvestor
// @Accept                      json
// @Produce                     json
// @securityDefinitions.apikey  ApiKeyAuth
// @Success                     200  {object}  balancesResponse
// @Failure                     400  {object}  errorResponse
// @Failure                     500  {object}  errorResponse
// @Router                      /investors/balance [get]
// @Security                    ApiKeyAuth
func (h *Controller) getBalanceHistoryInvestor(c *gin.Context) {
	investorID, err := helper.GetInvestorIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	balances, err := h.services.Investor.GetBalanceHistory(c, investorID)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, balancesResponse{Balances: balances})
}

// @Summary                     Get potential payouts for investor
// @Tags                        Investor
// @Description                 Get List of potential payouts snapshots
// @ID                          getPotentialPayouts
// @Accept                      json
// @Produce                     json
// @securityDefinitions.apikey  ApiKeyAuth
// @Success                     200  {object}  payoutResponse
// @Failure                     400  {object}  errorResponse
// @Failure                     500  {object}  errorResponse
// @Router                      /investors/payouts [get]
// @Security                    ApiKeyAuth
func (h *Controller) getPotentialPayouts(c *gin.Context) {
	investorID, err := helper.GetInvestorIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	payouts, err := h.services.Investor.GetPotentialPayouts(c, investorID)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, payoutResponse{Payouts: payouts})
}

func (h *Controller) getInvestorInfo(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Failed to convert string param into integer")
		return
	}

	investor, err := h.services.GetInvestorByID(c, uint64(id))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Investors info fetching failed")
		return
	}

	userFiles, err := h.services.GetUserFilesLinks(c, uint(id))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Investors files loading failed")
		return
	}

	c.JSON(http.StatusOK, investorUpdatingResponse{
		Name:        investor.Name,
		Surname:     investor.Surname,
		MiddleName:  investor.MiddleName,
		Photo:       userFiles["photo"],
		IDFile:      userFiles["id_file"],
	})
}

func (h *Controller) updateInvestorInfo(c *gin.Context) {
	var input command.InvestorUpdate

	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := c.ShouldBind(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	fmt.Println(input.IDFile.Filename)
	fmt.Println(input.Photo.Filename)

	investor := &models.Investor{
		Model: gorm.Model{
			ID: uint(id),
		},
		Name:       input.Name,
		Surname:    input.Surname,
		MiddleName: input.MiddleName,
	}

	investorFiles := &domain.Investor{
		Photo:  input.Photo,
		IDFile: input.IDFile,
	}

	if err := h.services.UpdateInvestor(c, investor, id, investorFiles); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, statusResponse{Status: "Added updated to user"})
}

func (h *Controller) getLoansByInvestorID(c *gin.Context) {
	investorID, err := helper.GetInvestorIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	loans, err := h.services.Loan.GetLoansByInvestor(c, uint64(investorID))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, loansByInvestorIDResponse{Loans: loans})
}

func (h *Controller) getCurrentInvestor(c *gin.Context) {
	investorID, err := helper.GetInvestorIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	investor, err := h.services.Investor.GetInvestorByID(c, uint64(investorID))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, currentInvestorResponse{
		ID:         int(investorID),
		Name:       investor.Name,
		Surname:    investor.Surname,
		MiddleName: investor.MiddleName,
		UserEmail:  investor.UserEmail,
		Balance:    investor.Balance,
		Role:       investor.Role,
		IsConfirmed: investor.StripeConfirmed,
	})
}
