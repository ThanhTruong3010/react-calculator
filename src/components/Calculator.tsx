import React, { useEffect, useState } from "react";
import CalculatorTitle from "./CalculatorTitle";
import DisplayResult from "./DisplayResult";
import DATA from "../mock/data.json";

const Calculator = () => {
  const [isAC, setIsAC] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(DATA);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("0");

  useEffect(() => {
    const condition = isAC ? "CE" : "AC";
    const buttons = DATA.filter((item) => item.value !== condition);
    setData(buttons);
  }, [isAC]);

  const handleClick = (value: string) => {
    setIsAC(false);
    setError("");
    switch (value) {
      case "=": {
        // if it's an equal sign, use the eval module
        // to evaluate the question ,convert the answer
        // (in number) to String
        if (question !== "") {
          let ans = "";
          try {
            ans = eval(question);
          } catch (err) {
            setError("Math error");
            setAnswer(answer);
            return;
          }
          setIsAC(true);
          setAnswer(ans);
          setQuestion("");
          break;
        }
      }
      case "AC": {
        // if it's the Clears sign, just clean our
        // question and answer in the state
        setAnswer("0");
        setQuestion("");
        setIsAC(true);
        break;
      }

      case "CE": {
        let str = question.trimEnd();
        str = str.substring(0, str.length - 1);
        console.log("str", str);
        setQuestion(str);
        break;
      }

      default: {
        // for every other command, update the answer in the state
        setQuestion(
          (preState) =>
            (preState =
              preState + `${typeof value === "number" ? value : ` ${value} `}`)
        );
        break;
      }
    }
  };

  return (
    <>
      <CalculatorTitle value="Calculator" />
      <DisplayResult question={question} answer={answer} />
      <div className="w-full mt-3 grid grid-cols-4 gap-4">
        {data.map((item) => (
          <button
            onClick={() => handleClick(item.value as string)}
            className={item.className}
            key={item.value}
          >
            {item.value}
          </button>
        ))}
      </div>
      <span className="text-red-500 mt-5">{error}</span>
    </>
  );
};

export default Calculator;
