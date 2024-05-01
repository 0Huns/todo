import { React, useCallback } from 'react';
import todoListFrame from"./TodoListFrame.module.css";

function TodoListFrame({todoList, setTodoList}) {
  let onDelete = useCallback((id)=>{
      setTodoList((prev)=>prev.filter((_,listId)=>listId !== id))  
  },[]);

  return (
    <div className={todoListFrame.listFrame}>
      {todoList.map((content,id)=>{
        return(
          <div key={id} className={todoListFrame.listItem}>
            {content}
            <button className={todoListFrame.delBtn} onClick={()=> onDelete(id)}>❌</button>
          </div>
        )
    })}
    </div>
  );
}

export default TodoListFrame;