import { React, useCallback, useContext, useEffect, useRef, useState } from 'react';
import todoListUpdate from"./TodoListUpdate.module.css";
import { ListSetContext } from '../context/ListSetContext';

function TodoListUpdate({item}) {
  const {setTodoList} = useContext(ListSetContext);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editInput, setEditInput] = useState(item.text);

  const editRef = useRef();

  useEffect(() => {
    if (isUpdate) {
      editRef.current.focus();
    }
  }, [isUpdate]);

  const onEdit = useCallback(() => {
    setIsUpdate(true);
  }, []);

  const onUpdate = useCallback((id) => {
    fetch(`http://localhost:6329/todoList/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: editInput
      })
    })
    .then(res => res.json())
    .then(()=>{
      setTodoList(prev => prev.map(prevItem => {
        if (prevItem.id === item.id) {
          return { ...prevItem, text: editInput }; 
        }
        return prevItem;
      }));
      setIsUpdate(false);
    })
  }, [editInput, item.id, setTodoList]);

  const onCancel = useCallback(() => {
    setIsUpdate(false);
  }, []);

  return (
    <>
    {
    isUpdate
      ? <div className={todoListUpdate.after}>
          <div className={todoListUpdate.afterContent}>
            <input type='text' className={todoListUpdate.editInput} placeholder={item.text} value={editInput} ref={editRef} onChange={(e)=>setEditInput(e.target.value)}/>
          </div>
          <button className={todoListUpdate.updateBtn} onClick={()=> onUpdate(item.id)}>✅</button>
          <button className={todoListUpdate.cancelBtn} onClick={()=> onCancel()}>❎</button>
        </div> 
      : <div className={todoListUpdate.before}>
          <div className={todoListUpdate.beforeContent}>
            {item.text}
          </div>
          <button className={todoListUpdate.modifyBtn} onClick={onEdit}>✏️</button>
        </div> 
    }
    </> 
  );
}

export default TodoListUpdate;
