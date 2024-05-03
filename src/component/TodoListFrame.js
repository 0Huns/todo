import { React, useCallback, useContext, useState } from 'react';
import todoListFrame from"./TodoListFrame.module.css";
import { ListSetContext } from '../context/ListSetContext';

function TodoListFrame() {
  const {todoList, setTodoList} = useContext(ListSetContext);

  const onDelete = useCallback((id)=>{
    setTodoList((prev)=>prev.filter((item)=>item.id !== id))  
  },[]);

  return (
    <div className={todoListFrame.listFrame}>
      {todoList.map((item)=>{
        return(
          <li key={item.id} className={todoListFrame.listItem}>
            <input type='checkbox' className={todoListFrame.checkBox}/>
            {item.text}
            <button className={todoListFrame.delBtn} onClick={()=> onDelete(item.id)}>❌</button>
          </li>
        )
      })}
    </div>
  );
}

export default TodoListFrame;
