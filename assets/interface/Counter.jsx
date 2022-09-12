import React from "react";
import { useState } from "react";
import './counter.css'
export default function Counter({setAmount}) {
  let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 1;
    setCount(count);
    setAmount(count)
  }
  function decrementCount() {
    if (count>0){ count = count - 1;
      setCount(count);
      setAmount(count)}
   
  }
  return (
    <div className="counter">
      <div>{count}</div>
      <button className="counterButton" onClick={incrementCount}>+</button>
      <button className="counterButton" onClick={decrementCount}>-</button>

    </div>
  );
}