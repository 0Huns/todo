import { React, useCallback, useContext } from 'react';
import todoListFrame from"./TodoListFrame.module.css";
import { ListSetContext } from '../context/ListSetContext';

function TodoListFrame() {
  const {todoList, setTodoList} = useContext(ListSetContext);

  const onDelete = useCallback((id)=>{
      setTodoList((prev)=>prev.filter((_,listId)=>listId !== id))  
  },[]);

  return (
    <div className={todoListFrame.listFrame}>
      {todoList.map((content,id)=>{
        return(
          <li key={id} className={todoListFrame.listItem}>
            <input type='checkbox' className={todoListFrame.checkBox}/>
            {content}
            <button className={todoListFrame.delBtn} onClick={()=> onDelete(id)}>❌</button>
          </li>
        )
    })}
    </div>
  );
}

export default TodoListFrame;