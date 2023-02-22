package controllers

import (
	"net/http"
	"strconv"
	"strings"

	"50Cent/backend/internal/constants"
	"50Cent/backend/internal/helper"

	"github.com/gin-gonic/gin"
)

func (h *Controller) AuthMiddleware(c *gin.Context) {
	header := c.GetHeader("Authorization")
	if header == "" {
		newErrorResponse(c, http.StatusUnauthorized, "Authorization header is empty")
		return
	}

	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		newErrorResponse(c, http.StatusUnauthorized, "Authorization header is invalid")
		return
	}

	email, userID, role, isTemporary, err := h.services.Auth.ParseToken(headerParts[1])
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	if isTemporary {
		newErrorResponse(c, http.StatusUnauthorized, "Invalid token")
		return
	}

	c.Set("userID", userID)
	c.Set("email", email)
	c.Set("role", role)
	c.Next()
}

func (h *Controller) LoginMiddleware(c *gin.Context) {
	header := c.GetHeader("Authorization")
	if header == "" {
		newErrorResponse(c, http.StatusUnauthorized, "Authorization header is empty")
		return
	}

	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		newErrorResponse(c, http.StatusUnauthorized, "Authorization header is invalid")
		return
	}

	email, userID, role, _, err := h.services.Auth.ParseToken(headerParts[1])
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.Set("userID", userID)
	c.Set("email", email)
	c.Set("role", role)
	c.Next()
}

func (h *Controller) AdminAuthMiddleware(c *gin.Context) {
	userID, err := helper.GetIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	admin, err := h.services.Auth.GetAdminByID(c, userID)
	if err != nil || admin == nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.Next()
}

func (h *Controller) CheckAccessLoanMiddleware(c *gin.Context) {
	userID, err := helper.GetIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "invalid id")
		return
	}

	role, err := helper.GetRoleFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	loan, err := h.services.Loan.GetByID(c, id)
	if err != nil || loan == nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	switch role {
	case constants.Consumer:
		consumer, err := h.services.GetConsumerByUserID(c, uint64(userID))
		if err != nil {
			newErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}

		if loan.ConsumerID != consumer.ID {
			newErrorResponse(c, http.StatusBadRequest, "you don't have access to this loan")
			return
		}

		c.Set("ConsumerID", loan.ConsumerID)
	case constants.Investor:
		investor, err := h.services.GetInvestorByUserID(c, uint64(userID))
		if err != nil {
			newErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}

		if loan.InvestorID != investor.ID {
			newErrorResponse(c, http.StatusBadRequest, "you don't have access to this loan")
			return
		}

		c.Set("InvestorID", loan.InvestorID)
	}

	c.Next()
}

func (h *Controller) CheckAdminRoleMiddleware(c *gin.Context) {
	role, err := helper.GetRoleFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	if role != constants.Admin {
		newErrorResponse(c, http.StatusUnauthorized, "you're not authorized to do this action")
		return
	}

	c.Next()
}

func (h *Controller) CheckInvestorRoleMiddleware(c *gin.Context) {
	role, err := helper.GetRoleFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	if role != constants.Investor {
		newErrorResponse(c, http.StatusUnauthorized, "you're not authorized to do this action")
		return
	}

	c.Next()
}

func (h *Controller) CheckConsumerRoleMiddleware(c *gin.Context) {
	role, err := helper.GetRoleFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	if role != constants.Consumer {
		newErrorResponse(c, http.StatusUnauthorized, "you're not authorized to do this action")
		return
	}

	c.Next()
}

func (h *Controller) VerifyConsumerExistsMiddleware(c *gin.Context) {
	userID, err := helper.GetIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	consumer, err := h.services.GetConsumerByUserID(c, uint64(userID))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "consumer doesn't exist")
		return
	}

	c.Set("ConsumerID", consumer.ID)
	c.Next()
}

func (h *Controller) VerifyInvestorExistsMiddleware(c *gin.Context) {
	userID, err := helper.GetIDFromCtx(c)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	investor, err := h.services.GetInvestorByUserID(c, uint64(userID))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "investor doesn't exist")
		return
	}

	c.Set("InvestorID", investor.ID)
	c.Next()
}
