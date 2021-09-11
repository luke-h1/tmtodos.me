package routes

import (
	"go-backend/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")

	admin := app.Group("admin")

	authenticated := api.Use(middlewares.IsAuthenticated)
}
