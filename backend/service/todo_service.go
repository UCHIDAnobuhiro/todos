package service

import (
	"backend/database"
	"backend/model"
)

func GetAllTodos() ([]model.Todo, error) {
	var todos []model.Todo
	err := database.DB.Find(&todos).Error
	return todos, err
}

func CreateTodo(title string) (model.Todo, error) {
	todo := model.Todo{Title: title, Done: false}
	err := database.DB.Create(&todo).Error
	return todo, err
}

func UpdateTodo(id int, updated model.Todo) (model.Todo, error) {
	var todo model.Todo
	// Find the todo by ID
	if err := database.DB.First(&todo, id).Error; err != nil {
		return todo, err
	}

	todo.Title = updated.Title
	todo.Done = updated.Done

	// Save the updated todo
	err := database.DB.Save(&todo).Error
	return todo, err

}

func DeleteTodo(id uint) error {
	return database.DB.Delete(&model.Todo{}, id).Error
}
