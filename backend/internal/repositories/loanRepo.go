package repositories

import (
	"context"
	"math"

	"50Cent/backend/internal/helper"
	"50Cent/backend/internal/models"

	"gorm.io/gorm"
)

type LoanRepository struct {
	db *gorm.DB
}

func NewLoanRepository(db *gorm.DB) *LoanRepository {
	return &LoanRepository{db: db}
}

func (r *LoanRepository) Create(ctx context.Context, loan *models.Loan) error {
	return r.db.WithContext(ctx).Create(loan).Error
}

func (r *LoanRepository) Delete(ctx context.Context, id uint64) error {
	return r.db.WithContext(ctx).Delete(&models.Loan{}, id).Error
}

func (r *LoanRepository) GetAll(ctx context.Context, page, pageSize int) (*[]models.Loan, float64, error) {
	var loans []models.Loan

	var totalRows int64

	var totalPages float64

	r.db.Model(loans).Where("is_accepted= ?", false).Count(&totalRows)

	if err := r.db.WithContext(ctx).Scopes(helper.Paginate(page, pageSize)).Where("is_accepted= ?", false).Find(&loans).Error; err != nil {
		return nil, 0, err
	}

	totalPages = math.Ceil(float64(totalRows) / float64(pageSize))

	return &loans, totalPages, nil
}

func (r *LoanRepository) GetByID(ctx context.Context, id uint64) (*models.Loan, error) {
	var loan models.Loan

	err := r.db.WithContext(ctx).First(&loan, id).Error
	if err != nil {
		return nil, err
	}

	return &loan, err
}

func (r *LoanRepository) GetLoanByConsumerID(ctx context.Context, consumerID uint) (*models.Loan, error) {
	var loans models.Loan

	err := r.db.WithContext(ctx).First(&loans, consumerID).Error
	if err != nil {
		return nil, err
	}

	return &loans, err
}

func (r *LoanRepository) GetAcceptedLoan(ctx context.Context, consumerID uint) (*[]models.Loan, error) {
	var loans []models.Loan

	err := r.db.WithContext(ctx).Where("consumer_id = ?", consumerID).Where("is_accepted = ?", true).Where("is_returned = ?", false).Find(&loans).Error
	if err != nil {
		return nil, err
	}

	return &loans, nil
}

func (r *LoanRepository) GetUnOfferedLoansByConsumerID(ctx context.Context, consumerID uint) (*[]models.Loan, error) {
	var loans []models.Loan

	err := r.db.WithContext(ctx).Where("consumer_id = ?", consumerID).Where("is_accepted = ?", false).Where("is_returned = ?", false).Find(&loans).Error
	if err != nil {
		return nil, err
	}

	return &loans, err
}

func (r *LoanRepository) GetAllCounterOffersByConsumerID(ctx context.Context, consumerID uint) (*[]models.LoanCounterofferDetails, error) {

	var loans []models.Loan
	var counterLoans []models.LoanCounterofferDetails
	
	// db.Table("users").Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&results)

	// err := r.db.WithContext(ctx).Model(&loans).Select("loans.credit_title, loan_counteroffers.loan_id, loans.consumer_id, loan_counteroffers.credit_term, loan_counteroffers.credit_rate").Joins("left join loan_counteroffers on loan_counteroffers.loan_id = loans.id").Where("consumer_id = ?", consumerID).Scan(&counterLoans).Error

	err := r.db.WithContext(ctx).Model(&loans).Where("consumer_id = ?", consumerID).Joins("LEFT JOIN loan_counteroffers ON loans.id = loan_counteroffers.loan_id").
	Select("loans.id, loans.credit_sum, loans.credit_title, loans.credit_term, loans.credit_rate, loans.investor_id, loan_counteroffers.credit_term, loan_counteroffers.credit_rate").
	Scan(&counterLoans).Error
	if err != nil {
		return nil, err
	}

	return &counterLoans, err
}

func (r *LoanRepository) GetAllByInvestorID(ctx context.Context, id uint) ([]models.Loan, error) {
	var loans []models.Loan
	if err := r.db.WithContext(ctx).Where("investor_id = ?", id).Where("is_accepted = ?", true).Where("is_returned = ?", false).Find(&loans).Error; err != nil {
		return nil, err
	}

	return loans, nil
}

func (r *LoanRepository) GetAllByConsumerID(ctx context.Context, id uint) ([]models.Loan, error) {
	var loans []models.Loan
	if err := r.db.WithContext(ctx).Where("consumer_id = ?", id).Where("is_accepted = ?", true).Where("is_returned = ?", false).Find(&loans).Error; err != nil {
		return nil, err
	}

	return loans, nil
}

func (r *LoanRepository) Update(ctx context.Context, loan *models.Loan) error {
	return r.db.WithContext(ctx).Save(loan).Error
}

func (r *LoanRepository) GetAllByInvestorIDWithConsumer(ctx context.Context, id uint) ([]models.GetLoanByInvestorID, error) {
	var loans []models.Loan

	var result []models.GetLoanByInvestorID

	err := r.db.WithContext(ctx).Model(&loans).Where("investor_id = ?", id).Where("is_accepted = ?", true).Where("is_returned = ?", false).Select("loans.*, consumers.name, consumers.surname").Joins("left join consumers on consumers.id = loans.consumer_id").Scan(&result).Error

	if err != nil {
		return nil, err
	}

	return result, err
}
