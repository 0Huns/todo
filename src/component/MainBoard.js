import { React } from 'react';
import mainBoard from"./MainBoard.module.css";
import TodoBoard from './TodoBoard';

function MainBoard() {
  return (
      <main>
        <section className={mainBoard.mainBoard}>
          <TodoBoard />
        </section>
      </main>
  );
}

export default MainBoard;
