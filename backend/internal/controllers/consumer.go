package controllers

import (
	"50Cent/backend/internal/command"
	"50Cent/backend/internal/domain"
	"50Cent/backend/internal/helper"
	"50Cent/backend/internal/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// @Summary                     Get Balance history for consumer
// @Tags                        Consumer
// @Description                 Get List of balance snapshots
// @ID                          getBalanceHistoryConsumer
// @Accept                      json
// @Produce                     json
// @securityDefinitions.apikey  ApiKeyAuth
// @Success                     200  {object}  balancesResponse
// @Failure                     400  {object}  errorResponse
// @Failure                     500  {object}  errorResponse
// @Router                      /consumers/balance [get]
// @Security                    ApiKeyAuth
func (h *Controller) getBalanceHistoryConsumer(c *gin.Context) {
	consumerID, err := helper.GetConsumerIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	balances, err := h.services.Consumer.GetBalanceHistory(c, consumerID)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, balancesResponse{Balances: balances})
}

// @Summary                     Get required payments for consumer
// @Tags                        Consumer
// @Description                 Get List of required payments snapshots
// @ID                          getRequiredPayments
// @Accept                      json
// @Produce                     json
// @securityDefinitions.apikey  ApiKeyAuth
// @Success                     200  {object}  payoutsArrayResponse
// @Failure                     400  {object}  errorResponse
// @Failure                     500  {object}  errorResponse
// @Router                      /consumers/payments [get]
// @Security                    ApiKeyAuth
func (h *Controller) getRequiredPayments(c *gin.Context) {
	consumerID, err := helper.GetConsumerIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	payments, err := h.services.Consumer.GetRequiredPayments(c, consumerID)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, payoutsArrayResponse{Payouts: payments})
}

func (h *Controller) updateConsumerInfo(c *gin.Context) {
	var input command.ConsumerUpdate

	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := c.ShouldBind(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	consumer := &models.Consumer{
		Model: gorm.Model{
			ID: uint(id),
		},
		Name:       input.Name,
		Surname:    input.Surname,
		MiddleName: input.MiddleName,
	}

	consumerFiles := &domain.Consumer{
		Photo:        input.Photo,
		IDFile:       input.IDFile,
		WorkFile:     input.WorkFile,
		PropertyFile: input.PropertyFile,
	}

	if err := h.services.UpdateConsumer(c, consumer, id, consumerFiles); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, statusResponse{Status: "Added updated to user"})
}

func (h *Controller) getConsumerInfo(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Failed to convert string param into integer")
		return
	}

	investor, err := h.services.GetConsumerByID(c, uint64(id))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Consumer info fetching failed")
		return
	}

	userFiles, err := h.services.GetUserFilesLinks(c, uint(id))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Consumer files loading failed")
		return
	}

	c.JSON(http.StatusOK, consumerUpdatingResponse{
		Name:         investor.Name,
		Surname:      investor.Surname,
		MiddleName:   investor.MiddleName,
		Photo:        userFiles["photo"],
		IDFile:       userFiles["id_file"],
		WorkFile:     userFiles["work_file"],
		PropertyFile: userFiles["property_file"],
	})
}

func (h *Controller) getCurrentConsumer(c *gin.Context) {
	consumerID, err := helper.GetConsumerIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	consumer, err := h.services.Consumer.GetConsumerByID(c, uint64(consumerID))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, currentConsumerResponse{
		ID:          int(consumerID),
		Name:        consumer.Name,
		Surname:     consumer.Surname,
		MiddleName:  consumer.MiddleName,
		UserEmail:   consumer.UserEmail,
		Balance:     consumer.Balance,
		Role:        consumer.Role,
		IsConfirmed: consumer.StripeConfirmed,
	})
}
