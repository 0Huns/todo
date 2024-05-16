import { React, useEffect, useMemo, useState } from 'react';
import todoBoard from"./TodoBoard.module.css";
import TodoInput from './TodoInput';
import TodoListFrame from './TodoListFrame';
import { ListSetContext } from '../context/ListSetContext';

function TodoBoard() {
  let [todoList,setTodoList] = useState([]);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/0Huns/todo_DB/todoList')
      .then(res => {
        if (!res.ok) {
          throw new Error('서버 연결을 실패하였습니다.');
        }
        return res.json();
      })
      .then(data => setTodoList(data))
      .catch(error => {
        alert(error.message);
      });
  }, []);

  const value = useMemo(()=>({
    todoList, setTodoList
  }),[todoList, setTodoList]);

  return (
    <ListSetContext.Provider value={value}>
      <div className={todoBoard.todoBoard}>
        <h1>TODO-LIST</h1>
        <TodoInput todoList={todoList} setTodoList={setTodoList}/>
      </div>
      <TodoListFrame todoList={todoList} setTodoList={setTodoList}/>
    </ListSetContext.Provider>
  );
}

export default TodoBoard;
