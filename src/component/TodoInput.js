import { React, useContext, useRef, useState } from 'react';
import todoInput from"./TodoInput.module.css";
import { ListSetContext } from '../context/ListSetContext';

function TodoInput() {
  const {setTodoList} = useContext(ListSetContext);

  let [input, setInput] = useState('');
  const inputFocus = useRef();

  const onFormSubmit = (e)=>{
    e.preventDefault();
    if(input.trim() === ""){
      alert("내용을 입력하세요.");
    } else {
      fetch('http://localhost:6329/todoList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: Date.now().toString(),
          text: input,
          checked: false
        })
      })
      .then(res => res.json())
      .then(newItem => {
        setTodoList((prev)=>[...prev, newItem]);
        setInput('');
        inputFocus.current.focus();
      })


      // const newItem = {
      //   id: Date.now(),
      //   text: input,
      //   check: false
      // };
      // setTodoList((prev)=>[newItem, ...prev]);
      // setInput('');
      // inputFocus.current.focus();
    }
  }

  return (
      <form className={todoInput.form} onSubmit={onFormSubmit}>
        <input 
        className={todoInput.todoInput}
        name='userinput'
        type='text' 
        placeholder='오늘의 목표를 작성.' 
        ref={inputFocus} 
        value={input}
        onChange={(e)=>setInput(e.target.value)}/>
        <button className={todoInput.todoSubmit} type='submit'>등록</button>
      </form>
  );
}

export default TodoInput;
