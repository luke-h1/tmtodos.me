package routes

import (
	"go-backend/src/controllers"
	"go-backend/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")

	user := api.Group("user")

	userAuthenticated := user.Use(middlewares.IsAuthenticated)

	// user endpoints
	user.Post("/register", controllers.Register)
	user.Post("/login", controllers.Login)

	userAuthenticated.Put("/info", controllers.UpdateInfo)
	userAuthenticated.Put("/password", controllers.UpdatePassword)
	userAuthenticated.Get("/", controllers.User)
	// todo endpoints
	todo := api.Group("todos")

	todoAuthenticated := todo.Use(middlewares.IsAuthenticated)

	todoAuthenticated.Get("/:id", controllers.GetTodo)
	todoAuthenticated.Get("/", controllers.Todos)
	todoAuthenticated.Post("/", controllers.CreateTodo)
	todoAuthenticated.Put("/:id", controllers.UpdateTodo)
	todoAuthenticated.Delete("/:id", controllers.DeleteTodo)

}
