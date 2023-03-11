import React from "react";

interface Props {
  question: string[];
  answer: string;
}

const Result = ({ question, answer }: Props) => {
  const equation = question
    .map((item) => {
      if (item === "(" || item === ")") return item;
      if ("0" <= item && item <= "9") return item;
      // add spaces around operators
      return ` ${item} `;
    })
    .join("")
    .trimEnd();

  return (
    <div className="w-full flex flex-col gap-4 justify-end items-end border-[1px] border-slate-300 rounded-xl p-4">
      {equation.endsWith("=") ? (
        <>
          <span>{equation}</span>
          <span className="text-3xl">{answer}</span>
        </>
      ) : (
        <>
          <span>{answer}</span>
          <span className="text-3xl">{equation}</span>
        </>
      )}
    </div>
  );
};

export default Result;
