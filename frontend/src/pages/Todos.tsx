import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { TodoInput } from "../components/TodoInput";
import { TodoList } from "../components/TodoList";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");

  // 最初に一回だけデータを取ってくる
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch("http://localhost:8080/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  const handleAddTodo = () => {
    if (newTitle.trim() === "") return;

    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        done: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prev) => [...prev, data]);
        setNewTitle("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const handleToggleTodo = (id: number) => {
    // フロント側
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );

    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;

    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: targetTodo.title,
        done: !targetTodo.done,
      }),
    }).catch((error) => {
      console.error("Error updating todo:", error);
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error("削除に失敗しました");
      }
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Todoリスト
        </h1>

        <TodoInput
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleAddTodo={handleAddTodo}
        />
        <TodoList
          todos={todos}
          handleToggleTodo={handleToggleTodo}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};
