package routes

import (
	"go-backend/src/controllers"
	"go-backend/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")

	user := api.Group("user")

	todo := api.Group("todos")

	// user endpoints
	user.Post("/register", controllers.Register)
	user.Post("/login", controllers.Login)

	todoAuthenticated := todo.Use(middlewares.IsAuthenticated)

	// todo endpoints
	todoAuthenticated.Get("/:id", controllers.GetTodo)
	todoAuthenticated.Get("/", controllers.Todos)
	todoAuthenticated.Post("/", controllers.CreateTodo)
	todoAuthenticated.Put("/:id", controllers.UpdateTodo)
	todoAuthenticated.Delete("/:id", controllers.DeleteTodo)

}
