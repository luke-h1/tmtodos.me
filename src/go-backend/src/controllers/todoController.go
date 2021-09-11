package controllers

import (
	"go-backend/src/database"
	"go-backend/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func Todos(c *fiber.Ctx) error {
	var todos []models.Todo

	database.DB.Find(&todos)

	return c.JSON(todos)

}

func CreateTodo(c *fiber.Ctx) error {
	var todo models.Todo

	if err := c.BodyParser(&todo); err != nil {
		return err
	}
	database.DB.Create(&todo)

	go database.ClearCache("todos")

	return c.JSON(todo)
}

func GetTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var todo models.Todo

	todo.Id = uint(id)

	database.DB.Find(&todo)

	return c.JSON(todo)
}

func UpdateTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	todo := models.Todo{}

	todo.Id = uint(id)

	if err := c.BodyParser(&todo); err != nil {
		return err
	}
	database.DB.Model(&todo).Updates(&todo)

	go database.ClearCache("todos")

	return c.JSON(todo)
}

func DeleteTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	todo := models.Todo{}
	todo.Id = uint(id)

	database.DB.Delete(&todo)

	go database.ClearCache("todos")

	return nil
}
