package app

import (
	"eliftech-school/backend/config"
	"eliftech-school/backend/internal/controllers"
	"eliftech-school/backend/internal/infrastructure/database"
	"eliftech-school/backend/internal/infrastructure/email"
	"eliftech-school/backend/internal/repositories"
	"eliftech-school/backend/internal/service"
)

func Run() error {
	cfg := config.GetConfig()

	db, err := database.NewPostgresDB(cfg)
	if err != nil {
		panic(err)
	}

	mailclnt := email.NewSendgridClient(cfg)

	rpsrs := repositories.NewRepository(db, cfg, mailclnt)
	srvcs := service.NewService(rpsrs, cfg)
	cntrs := controllers.NewController(srvcs, cfg)

	err = cntrs.InitRouter(cfg.App.Port)
	if err != nil {
		return err
	}

	return nil
}
