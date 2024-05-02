import { React, useContext, useRef, useState } from 'react';
import todoInput from"./TodoInput.module.css";
import { ListSetContext } from '../context/ListSetContext';

function TodoInput() {
  const {todoList, setTodoList} = useContext(ListSetContext);

  let [input, setInput] = useState('');
  const inputFocus = useRef();

  const onFormSubmit = (e)=>{
    e.preventDefault();
    if(input === ""){
      alert("내용을 입력하세요.");
    }else{
      setTodoList([input, ...todoList]);
      setInput('');
      inputFocus.current.focus();
    }
  }

  return (
      <form className={todoInput.form} onSubmit={onFormSubmit}>
        <input className={todoInput.todoInput} type='text' placeholder='오늘의 목표를 작성.' ref={inputFocus} value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button className={todoInput.todoSubmit} type='submit'>등록</button>
      </form>
  );
}

export default TodoInput;
