import React from "react";

interface Props {
  question: string;
  answer: string;
}

const Result = ({ question, answer }: Props) => (
  <div className="w-full flex flex-col gap-4 justify-end items-end border-[1px] border-slate-300 rounded-xl p-4">
    <span>{question}</span>
    <span>{answer}</span>
  </div>
);

export default Result;
