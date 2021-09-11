package controllers

import (
	"go-backend/src/database"
	"go-backend/src/models"

	"github.com/gofiber/fiber/v2"
)

func Admins(c *fiber.Ctx) error {
	var users []models.User

	database.DB.Where("is_admin = true").Find(&users)
	return c.JSON(users)
}
