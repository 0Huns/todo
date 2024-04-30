import { React, useState } from 'react';
import todoBoard from"./TodoBoard.module.css";

function TodoBoard() {
  let [input, setInput] = useState('');

  const onFormSubmit = (e)=>{
    e.preventDefault();
    if(input === ""){
      alert("내용을 입력하세요.");
    }else{
      alert("good");
      setInput('');
    }
  }

  return (
    <div className={todoBoard.todoBoard}>
      <h1>TODO-LIST</h1>
      <form className={todoBoard.form} onSubmit={onFormSubmit}>
        <input className={todoBoard.todoInput} type='text' placeholder='오늘의 목표를 작성.' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button className={todoBoard.todoSubmit} type='submit'>등록</button>
      </form>
    </div>
  );
}

export default TodoBoard;
