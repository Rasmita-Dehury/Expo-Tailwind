import { useState, useRef } from "react";

export default function Todo() {

  let [todos, setTodos] = useState([{ todoTxt: "getUp", isDone: false }]);

  const handleOnClick = () => {

  }

  const handleOnChange = (e) => {
    console.log(e);
    // console.log(e.keyCode);

    if (e.keyCode === 13) {
      setTodos([...todos, { todoTxt: e.target.value, isDone: false }]);
    }
  }

  return (
    <div>
      <input type="text" placeholder="Todo Name" className="border-2 border-cyan-900" onKeyDown={handleOnChange} />
      <button onClick={handleOnClick}>Submit</button>
      {todos.map((todo, i) => {
        return <li key={i}>
          {i + " - " + todo.todoTxt}
        </li>
      })}
    </div>
  )
}