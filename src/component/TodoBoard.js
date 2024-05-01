import { React, useState } from 'react';
import todoBoard from"./TodoBoard.module.css";
import TodoInput from './TodoInput';
import TodoListFrame from './TodoListFrame';

function TodoBoard() {
  let [todoList,setTodoList] = useState(["공부","우유"]);

  return (
    <>
    <div className={todoBoard.todoBoard}>
      <h1>TODO-LIST</h1>
      <TodoInput todoList={todoList} setTodoList={setTodoList}/>
    </div>
    <TodoListFrame todoList={todoList} setTodoList={setTodoList}/>
    </>
  );
}

export default TodoBoard;
