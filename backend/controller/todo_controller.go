package controller

import (
	"backend/model"
	"backend/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetTodos retrieves all todos from the database and returns them as JSON.
func GetTodos(c *gin.Context) {
	todos, err := service.GetAllTodos()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve todos"})
		return
	}
	c.JSON(http.StatusOK, todos)
}

// PostTodo creates a new todo in the database and returns it as JSON.
func PostTodo(c *gin.Context) {
	var req model.Todo
	// Bind the JSON request to the Todo struct
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Validate the request
	todo, err := service.CreateTodo(req.Title)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create todo"})
		return
	}
	c.JSON(http.StatusCreated, todo)
}

// PutTodo updates an existing todo in the database and returns it as JSON.
func PutTodo(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var req model.Todo
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todo, err := service.UpdateTodo(id, req)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}
	c.JSON(http.StatusOK, todo)
}

// DeleteTodo deletes a todo from the database.
func DeleteTodo(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := service.DeleteTodo(uint(id)); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted"})
}
