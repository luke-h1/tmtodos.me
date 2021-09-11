package routes

import (
	"go-backend/src/controllers"
	"go-backend/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")

	user := api.Group("user")

	todo := api.Group("todo")

	// user endpoints
	user.Post("/register", controllers.Register)
	user.Post("/login", controllers.Login)

	todoAuthenticated := todo.Use(middlewares.IsAuthenticated)

	// todo endpoints
	todoAuthenticated.Get("/todos/:id", controllers.GetTodo)
	todoAuthenticated.Get("/todos", controllers.Todos)
	todoAuthenticated.Post("/todos", controllers.CreateTodo)
	todoAuthenticated.Put("/todos/:id", controllers.UpdateTodo)
	todoAuthenticated.Delete("/todos/:id", controllers.DeleteTodo)

}
