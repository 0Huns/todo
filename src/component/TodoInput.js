import { React, useState } from 'react';
import todoInput from"./TodoInput.module.css";

function TodoInput({todoList, setTodoList}) {
  let [input, setInput] = useState('');

  const onFormSubmit = (e)=>{
    e.preventDefault();
    if(input === ""){
      alert("내용을 입력하세요.");
    }else{
      setTodoList([...todoList, input ]);
      setInput('');
    }
  }

  return (
      <form className={todoInput.form} onSubmit={onFormSubmit}>
        <input className={todoInput.todoInput} type='text' placeholder='오늘의 목표를 작성.' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button className={todoInput.todoSubmit} type='submit'>등록</button>
      </form>
  );
}

export default TodoInput;
