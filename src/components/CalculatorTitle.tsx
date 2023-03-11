import React from "react";

interface Props {
  value: string;
}
const CalculatorTitle = ({ value }: Props) => {
  return <div className="text-blue-500 text-3xl mb-5">{value}</div>;
};

export default CalculatorTitle;
