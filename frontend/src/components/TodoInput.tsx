import { FC } from "react";

type Props = {
  newTitle: string;
  setNewTitle: (value: string) => void;
  handleAddTodo: () => void;
};

export const TodoInput: FC<Props> = ({
  newTitle,
  setNewTitle,
  handleAddTodo,
}) => {
  return (
    <div className="flex mb-6">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="新しいTodoを入力"
        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-400"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
      >
        追加
      </button>
    </div>
  );
};
