import { useState } from 'react';
import "./Counter2.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="counter-box">
        <h1>Counter</h1>

        <div className="count">{count}</div>

        <button className="increase-btn" onClick={() => setCount(count + 1)}>
          Increase +1
        </button>

        <h3>Add Value</h3>

        <div className="add-buttons">
          <button onClick={() => setCount(count + 10)}>+10</button>
          <button onClick={() => setCount(count + 15)}>+15</button>
          <button onClick={() => setCount(count + 20)}>+20</button>
        </div>
      </div>
    </div>
  );
}

export default App;