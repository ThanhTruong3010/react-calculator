import { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  const [displayValue, setDisplayValue] = useState([]);

  return (
    <div className="max-w-3xl flex flex-col justify-center items-center m-auto h-full">
      <Calculator />
    </div>
  );
}

export default App;
