package database

import (
	"fmt"
	"go-backend/src/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(postgres.New(postgres.Config{
		DSN: "host=tmtodos_db user=root password=root dbname=tmtodos_me port=5432 sslmode=disable TimeZone=Asia/Tokyo",
	}), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		// panic("could not connect to database")

	}
}

func AutoMigrate() {
	DB.AutoMigrate(models.User{}, models.Todo{})
}
