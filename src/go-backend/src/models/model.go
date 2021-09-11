package models

import "time"

type Model struct {
	Id        uint `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
