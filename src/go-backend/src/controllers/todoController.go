package controllers

import (
	"go-backend/src/database"
	"go-backend/src/middlewares"
	"go-backend/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Todos(c *fiber.Ctx) error {
	var todos []models.Todo

	database.DB.Find(&todos)

	uid, _ := middlewares.GetUserId(c)

	database.DB.Where("user_id = ?", uid).Find(&todos)

	return c.JSON(todos)

}

func CreateTodo(c *fiber.Ctx) error {

	id, _ := middlewares.GetUserId(c)

	todo := models.Todo{
		UserId: id,
	}

	if err := c.BodyParser(&todo); err != nil {
		return err
	}

	database.DB.Create(&todo)

	go database.ClearCache("todos")

	return c.JSON(todo)
}

func GetTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	uid, _ := middlewares.GetUserId(c)

	var todo models.Todo

	todo.Id = uint(id)

	database.DB.Where("user_id = ?", uid).Find(&todo)

	// database.DB.Preload("todo").Find(&todo)

	return c.JSON(todo)
}

func UpdateTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	todo := models.Todo{}

	todo.Id = uint(id)

	uid, _ := middlewares.GetUserId(c)

	if err := c.BodyParser(&todo); err != nil {
		return err
	}

	database.DB.Where("user_id = ?", uid).Updates(&todo)

	go database.ClearCache("todos")

	return c.JSON(todo)
}

func DeleteTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	todo := models.Todo{}
	todo.Id = uint(id)

	uid, _ := middlewares.GetUserId(c)

	database.DB.Where("user_id = ?", uid).Delete(&todo)

	go database.ClearCache("todos")

	return nil
}
