import { React } from 'react';
import todoListFrame from"./TodoListFrame.module.css";

function TodoListFrame({todoList, setTodoList}) {
  return (
    <div className={todoListFrame.listFrame}>
      {todoList.map((index,id)=>{
        return(
          <div key={id} className={todoListFrame.listItem}>
            {index}
          </div>
        )
    })}
    </div>
  );
}

export default TodoListFrame;