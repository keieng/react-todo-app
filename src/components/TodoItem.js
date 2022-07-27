export const TodoItem = ({
  todo,
  toggleTodoListItemStatus,
  deleteTodoListItem,
}) => {
  const handleAddTodoListItem = () =>
    toggleTodoListItemStatus(todo.id, todo.done);

  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

  return (
    <li>
      {todo.content}
      <button onClick={handleAddTodoListItem}>
        {todo.done ? "inCompleted" : "completed"}
      </button>
      <button onClick={handleDeleteTodoListItem}>削除</button>
    </li>
  );
};
