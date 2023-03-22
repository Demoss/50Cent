package service

import (
	"context"
	"errors"
	"fmt"
	"mime/multipart"

	"50Cent/backend/config"
	"50Cent/backend/internal/constants"
	"50Cent/backend/internal/domain"
	"50Cent/backend/internal/models"
	"50Cent/backend/internal/repositories"
)

type ConsumerService struct {
	consumerRepo repositories.Consumer
	authRepo     repositories.Auth
	uploadRepo   repositories.Upload
	paymentRepo  repositories.Payment
	balanceRepo  repositories.Balance
	payoutRepo   repositories.Payout
	loanRepo     repositories.Loan
	cfg          *config.Config
}

func NewConsumerService(
	consumerRepo repositories.Consumer,
	uploadRepo repositories.Upload,
	authRepo repositories.Auth,
	paymentRepo repositories.Payment,
	balanceRepo repositories.Balance,
	payoutRepo repositories.Payout,
	loanRepo repositories.Loan,
	cfg *config.Config) *ConsumerService {
	return &ConsumerService{
		consumerRepo: consumerRepo,
		authRepo:     authRepo,
		uploadRepo:   uploadRepo,
		paymentRepo:  paymentRepo,
		balanceRepo:  balanceRepo,
		payoutRepo:   payoutRepo,
		loanRepo:     loanRepo,
		cfg:          cfg,
	}
}

func (s *ConsumerService) ConsumerRegistration(ctx context.Context, consumer *domain.Consumer) error {
	user, err := s.authRepo.GetUserByEmail(ctx, consumer.UserEmail)
	if err != nil {
		return err
	}

	user.Role = constants.Consumer

    err = s.authRepo.Update(ctx, user)
    if err != nil {
    	return err
    }

	consumer.UserID = user.ID

	err = s.consumerRepo.CreateConsumer(ctx, domainConsumerToDB(consumer))
	if err != nil {
		return err
	}

	modelConsumer, err := s.consumerRepo.GetConsumerByUserID(ctx, uint64(user.ID))
	if err != nil {
		return err
	}

	if err := s.AddFileToConsumer(ctx, modelConsumer, &consumer.Photo, models.Photo); err != nil {
		return err
	}

	if err := s.AddFileToConsumer(ctx, modelConsumer, &consumer.WorkFile, models.WorkFile); err != nil {
		return err
	}

	if err := s.AddFileToConsumer(ctx, modelConsumer, &consumer.IDFile, models.IDFile); err != nil {
		return err
	}

	if err := s.AddFileToConsumer(ctx, modelConsumer, &consumer.PropertyFile, models.PropertyFile); err != nil {
		return err
	}

	return nil
}

func domainConsumerToDB(consumer *domain.Consumer) *models.Consumer {
	return &models.Consumer{
		Name:       consumer.Name,
		Surname:    consumer.Surname,
		MiddleName: consumer.MiddleName,
		UserEmail:  consumer.UserEmail,
		UserID:     consumer.UserID,
	}
}

func (s *ConsumerService) AddFileToConsumer(ctx context.Context, consumer *models.Consumer, file *multipart.FileHeader, fileType models.FileType) error {
	if file.Size == 0 {
		return nil
	}

	modelFile, err := s.uploadRepo.CreateOne(ctx, file, fileType, consumer.UserID)
	if err != nil {
		return err
	}

	if err := s.uploadRepo.AddFileToConsumer(ctx, modelFile); err != nil {
		return err
	}

	return nil
}

func (s *ConsumerService) GetConsumerByUserID(ctx context.Context, userID uint64) (*models.Consumer, error) {
	consumer, err := s.consumerRepo.GetConsumerByUserID(ctx, userID)

	if err != nil {
		return nil, err
	}

	return consumer, nil
}

func (s *ConsumerService) GetConsumerByID(ctx context.Context, id uint64) (*models.Consumer, error) {
	consumer, err := s.consumerRepo.GetConsumerByID(ctx, id)

	if err != nil {
		return nil, err
	}

	return consumer, nil
}

func (s *ConsumerService) ApproveConsumerByID(ctx context.Context, id uint) error {
	consumer, err := s.consumerRepo.GetConsumerByUserID(ctx, uint64(id))
	if err != nil {
		return err
	}

	consumer.IsVerified = true

	err = s.consumerRepo.UpdateConsumer(ctx, consumer)
	if err != nil {
		return err
	}

	return nil
}

func (s *ConsumerService) DeclineConsumerByID(ctx context.Context, id uint) error {
	consumer, err := s.consumerRepo.GetConsumerByUserID(ctx, uint64(id))
	if err != nil {
		return err
	}

	err = s.consumerRepo.DeleteConsumer(ctx, consumer)
	if err != nil {
		return err
	}

	return nil
}

func (s *ConsumerService) GetAllUnverifiedConsumers(ctx context.Context) ([]models.Consumer, error) {
	return s.consumerRepo.GetAllUnverifiedConsumers(ctx)
}

func (s *ConsumerService) AddPayment(ctx context.Context, userID uint64) (string, error) {
	consumer, err := s.GetConsumerByUserID(ctx, userID)
	if err != nil {
		return "", err
	}

	url, id, err := s.paymentRepo.CreateAccount()
	if err != nil {
		return "", err
	}

	consumer.StripeID = id
	if err := s.consumerRepo.Save(ctx, consumer); err != nil {
		return "", err
	}

	return url, nil
}

func (s *ConsumerService) AddPaymentConfirm(ctx context.Context, accountID string, detailsSubmitted bool) error {
	if !detailsSubmitted {
		return nil
	}

	exists, err := s.consumerRepo.CheckIfExists(ctx, accountID)
	if err != nil {
		return err
	}

	if !exists {
		return errors.New("consumer doesn't exist")
	}

	consumer, err := s.consumerRepo.GetConsumerByStripeID(ctx, accountID)
	if err != nil {
		return err
	}

	consumer.StripeConfirmed = true

	err = s.consumerRepo.Save(ctx, consumer)
	if err != nil {
		return err
	}

	user, err := s.authRepo.GetUserByID(ctx, consumer.UserID)
	if err != nil {
		return err
	}

	user.Role = constants.Consumer

	err = s.authRepo.Update(ctx, user)
	if err != nil {
		return err
	}

	return nil
}

func (s *ConsumerService) GetBalanceHistory(ctx context.Context, id uint) ([]domain.Balance, error) {
	balanceSlice, err := s.balanceRepo.GetAllByConsumerID(ctx, id)
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

func (s *ConsumerService) GetRequiredPayments(ctx context.Context, id uint) ([]domain.Payout, error) {
	payoutModels, err := s.payoutRepo.GetByConsumerID(ctx, id)
	if err != nil {
		return nil, err
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

	// if len(payoutModels) != 0 || payoutModels[len(payoutModels)-1] .CreatedAt.Month() == time.Now().Month() {
	// 	payment, err := s.addRequiredPayment(ctx, id)
	// 	if err != nil {
	// 		return nil, err
	// 	}

	// 	payouts = append(payouts, *payment)
	// }

	return payouts, nil
}

func (s *ConsumerService) addRequiredPayment(ctx context.Context, id uint) (*domain.Payout, error) {
	loans, err := s.loanRepo.GetAllByConsumerID(ctx, id)
	if err != nil {
		return nil, err
	}

	var amount float64

	for _, loan := range loans {
		// now := time.Now()
		
			amount += loan.CreditSum / float64(loan.CreditTerm)
		
	}

	payment := models.Payout{
		Amount:     amount,
		IsConsumer: true,
		UserID:     id,
	}

	err = s.payoutRepo.Create(ctx, &payment)
	if err != nil {
		return nil, err
	}

	payoutModel, err := s.payoutRepo.GetLastByConsumerID(ctx, id)
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

func (s *ConsumerService) UpdateConsumer(ctx context.Context, consumer *models.Consumer, id uint64, files *domain.Consumer) error {
	consumerToUpdate, err := s.consumerRepo.GetConsumerByUserID(ctx, id)
	if err != nil {
		return nil
	}

	consumerToUpdate.Name = consumer.Name
	consumerToUpdate.MiddleName = consumer.MiddleName
	consumerToUpdate.Surname = consumer.Surname

	updateErr := s.consumerRepo.UpdateConsumer(ctx, consumerToUpdate)
	if updateErr != nil {
		fmt.Println("failed to update consumer", err)
	}

	if len(files.Photo.Header) > 0 {
		consumerPhoto := &domain.Consumer{
			Photo: files.Photo,
		}

		if err := s.DeleteFileFromConsumer(ctx, consumerPhoto, "photo"); err != nil {
			return err
		}

		if err := s.UpdateConsumerFiles(ctx, consumerPhoto, id); err != nil {
			return err
		}
	}

	if len(files.IDFile.Header) > 0 {
		consumerIDFile := &domain.Consumer{
			IDFile: files.IDFile,
		}

		if err := s.DeleteFileFromConsumer(ctx, consumerIDFile, "id_file"); err != nil {
			return err
		}

		if err := s.UpdateConsumerFiles(ctx, consumerIDFile, id); err != nil {
			return err
		}
	}

	if len(files.WorkFile.Header) > 0 {
		consumerWorkFile := &domain.Consumer{
			WorkFile: files.WorkFile,
		}

		if err := s.DeleteFileFromConsumer(ctx, consumerWorkFile, "work_file"); err != nil {
			return err
		}

		if err := s.UpdateConsumerFiles(ctx, consumerWorkFile, id); err != nil {
			return err
		}
	}

	if len(files.PropertyFile.Header) > 0 {
		consumerPropFile := &domain.Consumer{
			PropertyFile: files.PropertyFile,
		}

		if err := s.DeleteFileFromConsumer(ctx, consumerPropFile, "property_file"); err != nil {
			return err
		}

		if err := s.UpdateConsumerFiles(ctx, consumerPropFile, id); err != nil {
			return err
		}
	}

	return nil
}

func (s *ConsumerService) UpdateConsumerFiles(ctx context.Context, consumer *domain.Consumer, id uint64) error {
	modelConsumer, err := s.consumerRepo.GetConsumerByUserID(ctx, id)

	if err != nil {
		return err
	}

	if err := s.AddFileToConsumer(ctx, modelConsumer, &consumer.Photo, models.Photo); err != nil {
		return err
	}

	if err := s.AddFileToConsumer(ctx, modelConsumer, &consumer.IDFile, models.IDFile); err != nil {
		return err
	}

	if err := s.AddFileToConsumer(ctx, modelConsumer, &consumer.WorkFile, models.WorkFile); err != nil {
		return err
	}

	if err := s.AddFileToConsumer(ctx, modelConsumer, &consumer.WorkFile, models.PropertyFile); err != nil {
		return err
	}

	return nil
}

func (s *ConsumerService) DeleteFileFromConsumer(ctx context.Context, consumer *domain.Consumer, fileName string) error {
	err := s.uploadRepo.DeleteFile(ctx, fileName)
	if err != nil {
		return err
	}

	return nil
}
