package repositories

import (
	"50Cent/backend/internal/models"
	"context"

	"gorm.io/gorm"
)

type ConfirmationCodeRepository struct {
	db *gorm.DB
}

func NewConfirmationCodeRepository(db *gorm.DB) *ConfirmationCodeRepository {
	return &ConfirmationCodeRepository{db: db}
}

func (r *ConfirmationCodeRepository) Create(ctx context.Context, code *models.ConfirmationCode) error {
	return r.db.WithContext(ctx).Create(&code).Error
}

func (r *ConfirmationCodeRepository) GetConfirmationCode(ctx context.Context, user *models.User) (*models.ConfirmationCode, error) {
	var code models.ConfirmationCode

	err := r.db.WithContext(ctx).Where("user_ID = ?", user.ID).Last(&code).Error
	if err != nil {
		return nil, err
	}

	return &code, nil
}

func (r *ConfirmationCodeRepository) DeleteConfirmationCode(ctx context.Context, user *models.User) error {
	code, err := r.GetConfirmationCode(ctx, user)
	if err != nil {
		return err
	}

	if err := r.db.WithContext(ctx).Delete(code).Error; err != nil {
		return err
	}

	return nil
}

func (r *ConfirmationCodeRepository) CheckIfExists(ctx context.Context, user *models.User) (bool, error) {
	var exists bool

	err := r.db.WithContext(ctx).Model(&models.ConfirmationCode{}).Select("count(*) > 0").Where("user_ID = ?", user.ID).Find(&exists).Error
	if err != nil {
		return false, err
	}

	return exists, nil
}
