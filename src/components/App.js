import React, { useRef } from "react";

import { useTodo } from "../hooks/useTodo";

const TodoTitle = ({ title, as }) => {
  if (as === "h1") return <h1>{title}</h1>;
  if (as === "h2") return <h2>{title}</h2>;
  return <p>{title}</p>;
};

const TodoItem = ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {
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

const TodoList = ({
  todoList,
  toggleTodoListItemStatus,
  deleteTodoListItem,
}) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          toggleTodoListItemStatus={toggleTodoListItemStatus}
          deleteTodoListItem={deleteTodoListItem}
        />
      ))}
    </ul>
  );
};

const TodoAdd = ({ inputEl, handleAddTodoListItem }) => {
  return (
    <>
      <textarea ref={inputEl} />
      <button onClick={handleAddTodoListItem}>+ TODOを追加</button>
    </>
  );
};

function App() {
  const {
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem,
  } = useTodo();

  const inputEl = useRef(null);

  const handleAddTodoListItem = () => {
    if (inputEl.current.value === "") return;
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = "";
  };

  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  return (
    <>
      <TodoTitle title="TODO進捗管理" as="h1" />

      <TodoAdd
        inputEl={inputEl}
        handleAddTodoListItem={handleAddTodoListItem}
      />

      <TodoTitle title="未完了TODOリスト" as="h2" />
      <TodoList
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
      />

      <h2>完了TODOリスト</h2>
      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
      />
    </>
  );
}

export default App;
