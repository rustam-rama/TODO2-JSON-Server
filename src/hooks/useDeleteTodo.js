import { useState } from "react";
import { API_URL } from "../config";

export const useDeleteTodo = (setTodos) => {
  const [error, setError] = useState(null);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Ошибка при удалении задачи");

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { deleteTodo, error };
};
