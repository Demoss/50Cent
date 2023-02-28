package service

import (
	"50Cent/backend/config"
	"50Cent/backend/internal/constants"
	"50Cent/backend/internal/domain"
	"50Cent/backend/internal/models"
	"50Cent/backend/internal/repositories"
	"context"
	"errors"
	"fmt"
	"mime/multipart"
	"time"
)

type InvestorService struct {
	investorRepo repositories.Investor
	authRepo     repositories.Auth
	uploadRepo   repositories.Upload
	paymentRepo  repositories.Payment
	balanceRepo  repositories.Balance
	payoutRepo   repositories.Payout
	loanRepo     repositories.Loan
	cfg          *config.Config
}

func NewInvestorService(
	investorRepo repositories.Investor,
	uploadRepo repositories.Upload,
	authRepo repositories.Auth,
	paymentRepo repositories.Payment,
	balanceRepo repositories.Balance,
	payoutRepo repositories.Payout,
	loanRepo repositories.Loan,
	cfg *config.Config) *InvestorService {
	return &InvestorService{
		investorRepo: investorRepo,
		authRepo:     authRepo,
		uploadRepo:   uploadRepo,
		paymentRepo:  paymentRepo,
		balanceRepo:  balanceRepo,
		payoutRepo:   payoutRepo,
		loanRepo:     loanRepo,
		cfg:          cfg,
	}
}

func (s *InvestorService) InvestorRegistration(ctx context.Context, investor *domain.Investor) error {
	user, err := s.authRepo.GetUserByEmail(ctx, investor.UserEmail)
	if err != nil {
		return err
	}

	user.Role = constants.Investor

	err = s.authRepo.Update(ctx, user)
	if err != nil {
		return err
	}

	investor.UserID = user.ID

	err = s.investorRepo.CreateInvestor(ctx, domainInvestorToDB(investor))
	if err != nil {
		return err
	}

	modelInvestor, err := s.investorRepo.GetInvestorByUserID(ctx, uint64(user.ID))
	if err != nil {
		return err
	}

	if err := s.AddFileToInvestor(ctx, modelInvestor, &investor.Photo, models.Photo); err != nil {
		return err
	}

	if err := s.AddFileToInvestor(ctx, modelInvestor, &investor.IDFile, models.IDFile); err != nil {
		return err
	}

	return nil
}

func (s *InvestorService) UpdateInvestor(ctx context.Context, investor *models.Investor, id uint64, files *domain.Investor) error {
	investorToUpdate, err := s.investorRepo.GetInvestorByUserID(ctx, id)
	if err != nil {
		return nil
	}

	investorToUpdate.Name = investor.Name
	investorToUpdate.MiddleName = investor.MiddleName
	investorToUpdate.Surname = investor.Surname

	updateErr := s.investorRepo.UpdateInvestor(ctx, investorToUpdate)
	if updateErr != nil {
		fmt.Println("failed to update investor", err)
	}

	if len(files.Photo.Header) > 0 {
		investorPhoto := &domain.Investor{
			Photo: files.Photo,
		}

		if err := s.DeleteFileFromInvestor(ctx, investorPhoto, "photo"); err != nil {
			return err
		}

		if err := s.UpdateInvestorFiles(ctx, investorPhoto, id); err != nil {
			return err
		}
	}

	if len(files.IDFile.Header) > 0 {
		investorIDFile := &domain.Investor{
			IDFile: files.IDFile,
		}

		if err := s.DeleteFileFromInvestor(ctx, investorIDFile, "id_file"); err != nil {
			return err
		}

		if err := s.UpdateInvestorFiles(ctx, investorIDFile, id); err != nil {
			return err
		}
	}

	return nil
}

func (s *InvestorService) UpdateInvestorFiles(ctx context.Context, investor *domain.Investor, id uint64) error {
	modelInvestor, err := s.investorRepo.GetInvestorByUserID(ctx, id)

	if err != nil {
		return err
	}

	if err := s.AddFileToInvestor(ctx, modelInvestor, &investor.Photo, models.Photo); err != nil {
		return err
	}

	if err := s.AddFileToInvestor(ctx, modelInvestor, &investor.IDFile, models.IDFile); err != nil {
		return err
	}

	return nil
}

func (s *InvestorService) ApproveInvestorByID(ctx context.Context, id uint) error {
	investor, err := s.investorRepo.GetInvestorByUserID(ctx, uint64(id))
	if err != nil {
		return err
	}

	investor.IsVerified = true

	err = s.investorRepo.UpdateInvestor(ctx, investor)
	if err != nil {
		return err
	}

	return nil
}

func (s *InvestorService) DeclineInvestorByID(ctx context.Context, id uint) error {
	investor, err := s.investorRepo.GetInvestorByUserID(ctx, uint64(id))
	if err != nil {
		return err
	}

	err = s.investorRepo.DeleteInvestor(ctx, investor)
	if err != nil {
		return err
	}

	return nil
}

func (s *InvestorService) GetAllUnverifiedInvestors(ctx context.Context) ([]models.Investor, error) {
	return s.investorRepo.GetAllUnverifiedInvestors(ctx)
}

func domainInvestorToDB(investor *domain.Investor) *models.Investor {
	return &models.Investor{
		Name:       investor.Name,
		Surname:    investor.Surname,
		MiddleName: investor.MiddleName,
		UserEmail:  investor.UserEmail,
		UserID:     investor.UserID,
	}
}

func (s *InvestorService) AddFileToInvestor(ctx context.Context, investor *models.Investor, file *multipart.FileHeader, fileType models.FileType) error {
	if file.Size == 0 {
		return nil
	}

	modelFile, err := s.uploadRepo.CreateOne(ctx, file, fileType, investor.UserID)
	if err != nil {
		return err
	}

	if err := s.uploadRepo.AddFileToInvestor(ctx, modelFile); err != nil {
		return err
	}

	return nil
}

func (s *InvestorService) DeleteFileFromInvestor(ctx context.Context, investor *domain.Investor, fileName string) error {
	err := s.uploadRepo.DeleteFile(ctx, fileName)
	if err != nil {
		return err
	}

	return nil
}

func (s *InvestorService) GetInvestorByUserID(ctx context.Context, userID uint64) (*models.Investor, error) {
	investor, err := s.investorRepo.GetInvestorByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	return investor, nil
}

func (s *InvestorService) GetInvestorByID(ctx context.Context, id uint64) (*models.Investor, error) {
	investor, err := s.investorRepo.GetInvestorByID(ctx, id)

	if err != nil {
		return nil, err
	}

	return investor, nil
}

func (s *InvestorService) AddPayment(ctx context.Context, userID uint64) (string, error) {
	investor, err := s.GetInvestorByUserID(ctx, userID)
	if err != nil {
		return "", err
	}

	url, id, err := s.paymentRepo.CreateAccount()
	if err != nil {
		return "", err
	}

	investor.StripeID = id
	if err := s.investorRepo.Save(ctx, investor); err != nil {
		return "", err
	}

	return url, nil
}

func (s *InvestorService) AddPaymentConfirm(ctx context.Context, accountID string, detailsSubmitted bool) error {
	if !detailsSubmitted {
		return nil
	}

	exists, err := s.investorRepo.CheckIfExists(ctx, accountID)
	if err != nil {
		return err
	}

	if !exists {
		return errors.New("investor doesn't exist")
	}

	investor, err := s.investorRepo.GetInvestorByStripeID(ctx, accountID)
	if err != nil {
		return err
	}

	investor.StripeConfirmed = true

	err = s.investorRepo.Save(ctx, investor)
	if err != nil {
		return err
	}

	user, err := s.authRepo.GetUserByID(ctx, investor.UserID)
	if err != nil {
		return err
	}

	user.Role = constants.Investor

	err = s.authRepo.Update(ctx, user)
	if err != nil {
		return err
	}

	return nil
}

func (s *InvestorService) GetBalanceHistory(ctx context.Context, id uint) ([]domain.Balance, error) {
	balanceSlice, err := s.balanceRepo.GetAllByInvestorID(ctx, id)
	if err != nil {
		return nil, err
	}

	balances := make([]domain.Balance, 0, len(balanceSlice))

	for _, model := range balanceSlice {
		balance := domain.Balance{
			ID:    model.ID,
			Value: model.Value,
			Time:  model.Time,
		}

		balances = append(balances, balance)
	}

	return balances, nil
}

func (s *InvestorService) GetPotentialPayouts(ctx context.Context, id uint) (float64, error) {
	payoutModels, err := s.payoutRepo.GetByInvestorID(ctx, id)
	if err != nil {
		return 0, err
	}

	payouts := make([]domain.Payout, 0, len(payoutModels))

	for _, model := range payoutModels {
		payout := domain.Payout{
			ID:     model.ID,
			Amount: model.Amount,
			Time:   model.CreatedAt,
		}
		payouts = append(payouts, payout)
	}
	payment, err := s.addPotentialPayout(ctx, id)
	if err != nil {
		return 0, err
	}

	payouts = append(payouts, *payment)

	return payouts[len(payouts)-1].Amount, nil
}

func (s *InvestorService) addPotentialPayout(ctx context.Context, id uint) (*domain.Payout, error) {
	loans, err := s.loanRepo.GetAllByInvestorID(ctx, id)
	if err != nil {
		return nil, err
	}

	var amount float64

	for _, loan := range loans {
		now := time.Now()
		if now.Year() != loan.AcceptedAt.Year() {
			yearGap := now.Year() - loan.AcceptedAt.Year()
			monthCount := (12 - int(loan.AcceptedAt.Month())) + (yearGap - 1) + int(now.Month())

			if monthCount > int(loan.ReturnedAmount) {
				amount += loan.CreditSum / float64(loan.CreditTerm)
			}
		} else {
			monthCount := now.Month() - loan.AcceptedAt.Month() + 1

			if int(monthCount) > int(loan.ReturnedAmount) {
				amount += loan.CreditSum / float64(loan.CreditTerm)
			}
		}
	}

	payment := models.Payout{
		Amount:     amount,
		IsConsumer: false,
		UserID:     id,
	}

	err = s.payoutRepo.Create(ctx, &payment)
	if err != nil {
		return nil, err
	}

	payoutModel, err := s.payoutRepo.GetLastByInvestorID(ctx, id)
	if err != nil {
		return nil, err
	}

	payout := domain.Payout{
		ID:     payoutModel.ID,
		Amount: payoutModel.Amount,
		Time:   payoutModel.CreatedAt,
	}

	return &payout, nil
}
