package models

type Todo struct {
	Model
	Title  string `json:"title"`
	Body   string `json:"body"`
	IsDone bool   `json:"is_done"`
}
