package app

import (
	"50Cent/backend/config"
	"50Cent/backend/internal/controllers"
	"fmt"
)

func Run() error {
	cfg := config.GetConfig()

	fmt.Println(cfg)
	/*mailclnt := email.NewSendgridClient(cfg)

	rpsrs := repositories.NewRepository(nil, nil, nil)
	srvcs := service.NewService(nil, nil)
	*/
	cntrs := controllers.NewController(nil, nil)

	err := cntrs.InitRouter(cfg.App.Port)
	if err != nil {
		return err
	}

	return nil
}
