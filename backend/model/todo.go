package model

type Todo struct {
	ID    int    `gorm:"primaryKey" json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
}
