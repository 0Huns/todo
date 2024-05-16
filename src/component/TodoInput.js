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
      .then(res => {
        if (!res.ok) {
          throw new Error('항목 추가에 실패했습니다.');
        }
        return res.json();
      })
      .then(newItem => {
        setTodoList((prev) => [...prev, newItem]);
        setInput('');
        inputFocus.current.focus();
      })
      .catch(error => {
        alert('ERROR : ' + error.message);
      });
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
