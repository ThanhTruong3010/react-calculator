import React, { useEffect, useState } from "react";
import CalculatorTitle from "./CalculatorTitle";
import DisplayResult from "./DisplayResult";
import DATA from "../mock/data.json";

const isDigit = (char: string) => "0" <= char && char <= "9";

const Calculator = () => {
  const [isAC, setIsAC] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(DATA);
  const [question, setQuestion] = useState(["0"] as string[]);
  const [answer, setAnswer] = useState("");

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
        // don't calculate again
        if (question.at(-1) !== "=") {
          try {
            const equation = question
              .flatMap((item, index) => {
                if (
                  item === "(" &&
                  index > 0 &&
                  isDigit(question[index - 1][0])
                ) {
                  return ["*", item];
                }
                return [item];
              })
              .join("");

            const ans = eval(equation);
            // if equation evaluate successfully, mark question as calculated
            setQuestion((q) => [...q, "="]);

            setIsAC(true);
            setAnswer(ans);
          } catch (err) {
            setError("Math error");
            setAnswer(answer);
            return;
          }
          break;
        }
      }
      case "AC": {
        // if it's the AC sign, just clean our
        // question and answer in the state
        setAnswer("Ans = 0");
        setQuestion(["0"]);
        setIsAC(true);
        break;
      }

      case "CE": {
        setQuestion((preState) => {
          const lastItem = preState.at(-1)!;
          if (lastItem.length === 1) {
            const arr = preState.slice(0, -1);
            return arr.length === 0 ? ["0"] : arr;
          }
          return [...preState.slice(0, -1), lastItem.slice(0, -1)];
        });
        break;
      }

      default: {
        // for every other command, update the answer in the state
        setQuestion((preState) => {
          const lastItem = preState.at(-1)!;
          if (lastItem === "=") {
            setAnswer((answer) => "Ans = " + answer);
            if (typeof value === "number") {
              return [Number(value).toString()];
            } else {
              // keep answer as an operand
              return [answer, value];
            }
          }
          if (value === "(") {
            if (preState.length === 1 && lastItem === "0") {
              return ["("];
            }
            return [...preState, value];
          }
          if (value === ")") {
            // prevent empty pair of bracket "()"
            if (lastItem === "(") {
              return preState;
            }
            // the number of open brackets, which are not closed
            const open = preState.reduce((result, value) => {
              if (value === "(") return result + 1;
              if (value === ")") return result - 1;
              return result;
            }, 0);
            return open === 0 ? preState : [...preState, value];
          }

          const last2Digits = lastItem.padStart(2, " ").slice(-2);
          const [a, b] = last2Digits;
          // lastItem is a number
          const isNumber = "0" <= b && b <= "9";

          if (typeof value === "number") {
            // if question endsWith 0, with no doubt, lastItem is a number
            if (b === "0") {
              // if the second last character is not a number
              if (a < "0" || a > "9") {
                // then, the last number in question is 0, replace with input number
                return [
                  ...preState.slice(0, -1),
                  lastItem.slice(0, -1) + Number(value).toString(),
                ];
              }
            }

            // lastItem is a number
            if (isNumber) {
              return [
                ...preState.slice(0, -1),
                lastItem + Number(value).toString(),
              ];
            }

            // lastItem is not a number
            return [...preState, Number(value).toString()];
          }
          // lastItem is definitely a operator now
          if (isNumber) {
            // add new operator
            return [...preState, value];
          }
          // replace operator
          return [...preState.slice(0, -1), value];
        });
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
