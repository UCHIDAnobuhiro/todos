import { FC } from "react";
import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  handleToggleTodo: (id: number) => void;
  handleDelete: (id: number) => void;
};

export const TodoList: FC<Props> = ({
  todos,
  handleToggleTodo,
  handleDelete,
}) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
