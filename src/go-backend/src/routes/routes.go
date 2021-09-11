package routes

import (
	"go-backend/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")

	user := api.Group("user")

	user.Post("/register", controllers.Register)
	user.Post("/login", controllers.Login)

	// authenticated := api.Use(middlewares.IsAuthenticated)

}
