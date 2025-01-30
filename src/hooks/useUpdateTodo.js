import { useState } from "react";
import { API_URL } from "../config";

export const useUpdateTodo = (setTodos) => {
  const [error, setError] = useState(null);

  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Ошибка при обновлении задачи");

      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setError(null);
      return updatedTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { updateTodo, error };
};
