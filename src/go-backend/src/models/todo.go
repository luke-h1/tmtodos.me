package models

type Todo struct {
	Model
	Title string `json:"title"`
	Text  string `json:"text"`
}
