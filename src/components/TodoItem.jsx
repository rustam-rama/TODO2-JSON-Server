// Компонент для отдельной задачи
import React, { useState } from "react";
import PropTypes from "prop-types";

const TodoItem = ({ todo, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleUpdate = () => {
    onUpdate(todo.id, { title: editText });
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <div
          className={`todo-checkbox ${todo.completed ? "completed" : ""}`}
          onClick={() => onToggleComplete(todo.id, todo.completed)}
        />
        {isEditing ? (
          <div className="todo-edit">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="todo-input"
            />
            <button onClick={handleUpdate} className="todo-button">
              Сохранить
            </button>
            <button onClick={() => setIsEditing(false)} className="todo-button">
              Отмена
            </button>
          </div>
        ) : (
          <div className="todo-text-container">
            <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
              {todo.title}
            </span>
            <div className="todo-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="todo-button"
              >
                Редактировать
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="todo-button delete"
              >
                Удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoItem;
