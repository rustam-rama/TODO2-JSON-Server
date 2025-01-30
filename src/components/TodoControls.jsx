import PropTypes from "prop-types";

const TodoControls = ({ searchQuery, onSearch, isSorted, onSort }) => (
  <div className="todo-controls">
    <input
      type="text"
      placeholder="Поиск задач..."
      onChange={(e) => onSearch(e.target.value)}
      className="todo-search"
      value={searchQuery}
    />
    <button
      onClick={onSort}
      className={`todo-sort-button ${searchQuery ? "enabled" : ""}`}
      disabled={!searchQuery}
    >
      {isSorted ? "Отменить сортировку" : "Сортировать по алфавиту"}
    </button>
  </div>
);

TodoControls.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  isSorted: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TodoControls;
