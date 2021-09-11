package controllers

import (
	"go-backend/src/database"
	"go-backend/src/middlewares"
	"go-backend/src/models"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var exists models.User

	database.DB.Where("email = ?", data["email"]).First(&exists)

	// check if user exists
	if exists.Email == data["email"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"field":   "email",
			"message": "Email already taken",
		})
	}

	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"field":   "password",
			"message": "Passwords do not match",
		})
	}

	user := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
		IsAdmin:   false,
	}
	user.SetPassword(data["password"])
	database.DB.Create(&user)
	return c.JSON(user)

}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	// user not found in DB
	if user.Id == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "incorrect credentials",
			"field":   "email",
		})
	}
	// incorrect password
	if err := user.ComparePassword(data["password"]); err != nil {
		return c.JSON(fiber.Map{
			"message": "incorrect credentials",
			"field":   "email",
		})
	}
	token, err := middlewares.GenerateJWT(user.Id)

	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect credentials",
			"field":   "email",
		})
	}

	// gen new cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24), // 1 day
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

// get authenticated user
func User(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)

	var user models.User

	database.DB.Where("id = ?", id).First(&user)

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	// set cookie to expire in a date in the past
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour), // expired 1 hour ago
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	c.Status(fiber.StatusOK)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

// update user info
func UpdateInfo(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := middlewares.GetUserId(c)

	user := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
	}
	user.Id = id
	database.DB.Model(models.User{}).Updates(&user)
	return c.JSON(user)
}

// update user password
func UpdatePassword(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "passwords do not match",
			"field":   "password",
		})
	}
	id, _ := middlewares.GetUserId(c)

	user := models.User{}
	user.Id = id
	user.SetPassword(data["password"])

	database.DB.Model(&user).Updates(&user)
	return c.JSON(user)
}
