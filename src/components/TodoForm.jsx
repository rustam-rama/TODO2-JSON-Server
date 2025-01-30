import { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await onAddTodo(newTodo);
      setNewTodo("");
      setError(null);
    } catch (err) {
      setError("Ошибка при добавлении задачи");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Какая задача на сегодня?"
        className="todo-input"
      />
      <button type="submit" className="add-button" disabled={!newTodo.trim()}>
        Добавить
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm;
