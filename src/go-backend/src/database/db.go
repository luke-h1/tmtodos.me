package database

import (
	"go-backend/src/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error

	DB, err = gorm.Open(mysql.Open("root:root@tcp(db:5432)/tmtodos-me"), &gorm.Config{})

	if err != nil {
		panic("Could not connect to database")
	}
}

func AutoMigrate() {
	DB.AutoMigrate(models.User{}, models.Todo{})
}
