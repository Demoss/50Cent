package app

import (
	"50Cent/backend/config"
	"50Cent/backend/internal/controllers"
	"50Cent/backend/internal/infrastructure/email"
	"50Cent/backend/internal/repositories"
	"50Cent/backend/internal/service"
)

func Run() error {
	cfg := config.GetConfig()

	mailclnt := email.NewSendgridClient(cfg)

	rpsrs := repositories.NewRepository(nil, cfg, mailclnt)
	srvcs := service.NewService(rpsrs, cfg)
	cntrs := controllers.NewController(srvcs, cfg)

	err := cntrs.InitRouter(cfg.App.Port)
	if err != nil {
		return err
	}

	return nil
}
