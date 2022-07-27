import { useState, useEffect } from "react";
import { ulid } from "ulid";
import * as todoData from "../apis/todos";

export const useTodo = () => {
  const [todoList, setTodoList] = useState([]);

  //モックサーバーからデータを取得する
  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      setTodoList([...todo].reverse());
    });
  }, []);

  /**
   * TODOの完了、未完了を更新する
   * @param {*} id
   * @param {*} done
   */
  const toggleTodoListItemStatus = (id, done) => {
    const todoItem = todoList.find((item) => item.id === id);

    const newTodoItem = { ...todoItem, done: !done };

    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((item) =>
        item.id !== updatedTodo.id ? item : updatedTodo
      );

      setTodoList(newTodoList);
    });
  };

  /**
   * 新規TODO追加
   * @param {*} todoContent
   * @returns
   */
  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      content: todoContent,

      id: ulid(),

      done: false,
    };
    return todoData.addTodoData(newTodoItem).then((addTodo) => {
      setTodoList([addTodo, ...todoList]);
    });
  };

  /**
   * TODOの削除
   * @param {*} id
   */
  const deleteTodoListItem = (id) => {
    todoData.deleteTodoData(id).then((deleteListItemID) => {
      const newTodoList = todoList.filter(
        (item) => item.id !== deleteListItemID
      );
      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem,
  };
};
