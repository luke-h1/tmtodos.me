package models

type Todo struct {
	Model
	Title  string `json:"title"`
	Body   string `json:"body"`
	IsDone bool   `json:"is_done"`
	UserId []User `json:"user_id" gorm:"foreignKey:Id"`
}
