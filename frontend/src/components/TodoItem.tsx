import { FC } from "react";
import { Todo } from "../types/Todo";

type Props = {
  todo: Todo;
  handleToggleTodo: (id: number) => void;
  handleDelete: (id: number) => void;
};

export const TodoItem: FC<Props> = ({
  todo,
  handleToggleTodo,
  handleDelete,
}) => {
  return (
    <li
      className="bg-gray-50 p-3 rounded-md flex items-center justify-between shadow-sm cursor-pointer"
      onClick={() => handleToggleTodo(todo.id)}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.done}
          readOnly
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <span className={`text-gray-700 ${todo.done ? "line-through" : ""}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(todo.id);
        }}
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm shadow"
      >
        削除
      </button>
    </li>
  );
};
