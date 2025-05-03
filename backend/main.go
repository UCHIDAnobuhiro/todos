package main

import (
	"backend/controller"
	"backend/database"
	"backend/model"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// Initialize the database connection
	database.Init()

	// Migrate the schema
	database.DB.AutoMigrate(&model.Todo{})

	// Set up the Gin router with CORS
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/todos", controller.GetTodos)
	r.POST("/todos", controller.PostTodo)
	r.PUT("/todos/:id", controller.PutTodo)
	r.DELETE("/todos/:id", controller.DeleteTodo)

	r.Run(":8080")
}
