import { useState, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";
import {
  useFetchTodo,
  useAddTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../hooks";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TodoControls from "./TodoControls";
import "./TodoList.css";

const TodoList = () => {
  const { todos, isLoading, error, setTodos } = useFetchTodo();
  const { addTodo } = useAddTodo(setTodos);
  const { updateTodo } = useUpdateTodo(setTodos);
  const { deleteTodo } = useDeleteTodo(setTodos);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 20),
    []
  );

  const handleSort = useCallback(() => {
    setIsSorted((prev) => !prev);
    if (isSorted) {
      setSearchQuery("");
      const searchInput = document.querySelector(".todo-search");
      if (searchInput) searchInput.value = "";
    }
  }, [isSorted]);

  const filteredAndSortedTodos = useMemo(() => {
    if (!todos?.length) return [];
    if (!isSorted) return [...todos];
    if (isSorted && searchQuery) {
      return [...todos]
        .filter((todo) =>
          todo?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) =>
          a?.title?.toLowerCase().localeCompare(b?.title?.toLowerCase())
        );
    }
    return [...todos];
  }, [todos, searchQuery, isSorted]);

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Список задач</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoControls
        searchQuery={searchQuery}
        onSearch={debouncedSearch}
        isSorted={isSorted}
        onSort={handleSort}
      />
      <div className="todo-items-container">
        {filteredAndSortedTodos.length ? (
          filteredAndSortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              onToggleComplete={(id, completed) =>
                updateTodo(id, { completed: !completed })
              }
            />
          ))
        ) : (
          <div className="no-todos">Нет задач</div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
