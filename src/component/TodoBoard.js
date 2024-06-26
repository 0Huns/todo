import { React, useEffect, useMemo, useState } from 'react';
import todoBoard from"./TodoBoard.module.css";
import TodoInput from './TodoInput';
import TodoListFrame from './TodoListFrame';
import { ListSetContext } from '../context/ListSetContext';

function TodoBoard() {
  let [todoList,setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://electric-good-hippodraco.glitch.me/todoList');
        if (!response.ok) {
          throw new Error('서버 연결을 실패하였습니다.');
        }
        const data = await response.json();
        setTodoList(data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
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
