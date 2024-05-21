import { React, useContext, useState} from 'react';
import todoListFrame from"./TodoListFrame.module.css";
import { ListSetContext } from '../context/ListSetContext';
import TodoListUpdate from './TodoListUpdate';

function TodoListFrame() {
  const {todoList, setTodoList} = useContext(ListSetContext);

  let [checked, setChecked] = useState(false);

  const onCheck = (id)=>{
    setChecked((prev)=>!prev);
    
    fetch(`https://electric-good-hippodraco.glitch.me/todoList/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        checked: checked
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('체크 표시가 반영되지 않았습니다.');
      }
      return res.json();
    })
    .then(updateItem => {
      const items = todoList.map(list =>
        list.id === updateItem.id ? updateItem : list
      );
      setTodoList(items);
    })
    .catch(error => {
      alert('ERROR :' + error.message);
    });
  };

  const onDelete = (id)=>{
    fetch(`https://electric-good-hippodraco.glitch.me/todoList/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(()=>{
      setTodoList((prev)=>prev.filter((item)=>item.id !== id))
    })
  };

  return (
    <div className={todoListFrame.listFrame}>
      {todoList.map((item)=>{
        return(
          <li key={item.id} className={todoListFrame.listItem}>
            <input type='checkbox' className={todoListFrame.checkBox} name={item.text}checked={item.checked} onChange={()=>onCheck(item.id)}/>
            <TodoListUpdate item={item}/>
            <button className={todoListFrame.delBtn} onClick={()=> onDelete(item.id)}>❌</button>
          </li>
        )
      })}
    </div>
  );
}

export default TodoListFrame;
