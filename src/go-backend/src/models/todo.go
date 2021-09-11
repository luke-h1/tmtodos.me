package models

type Todo struct {
	Model
	Title  string `json:"title"`
	Body   string `json:"body"`
	IsDone bool   `json:"is_done"`
	UserId uint   `json:"user_id"`
	User   User   `json:"user" gorm:"foreignKey:UserId"`
}
