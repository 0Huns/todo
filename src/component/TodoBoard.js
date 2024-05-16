import { React, useEffect, useMemo, useState } from 'react';
import todoBoard from"./TodoBoard.module.css";
import TodoInput from './TodoInput';
import TodoListFrame from './TodoListFrame';
import { ListSetContext } from '../context/ListSetContext';

function TodoBoard() {
  let [todoList,setTodoList] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:6329/todoList')
      .then(res => {return res.json()})
      .then(data => setTodoList(data))
  },[])

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
