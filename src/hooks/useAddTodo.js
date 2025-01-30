import { useState } from "react";
import { API_URL } from "../config";

export const useAddTodo = (setTodos) => {
  const [error, setError] = useState(null);

  const addTodo = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          completed: false,
        }),
      });

      if (!response.ok) throw new Error("Ошибка при добавлении задачи");

      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
      setError(null);
      return newTodo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { addTodo, error };
};
