import React from "react";

import "./App.css";

function prettyFieldName(fieldName: string) {
  const out: string[] = [""];
  for (let i = 0; i < fieldName.length; i++) {
    const char = fieldName[i];
    const lowerChar = char.toLocaleLowerCase();
    const isUpperCase = lowerChar !== char;
    if (isUpperCase) {
      out.push("");
    }
    out[out.length - 1] = out[out.length - 1] + lowerChar;
    console.log(isUpperCase, char);
  }
  return out.join(" ");
}

export const App: React.FC = () => {
  return (
    <div className="bg-gray-200">
      {prettyFieldName("itemPrice")}
      <br />
      {prettyFieldName("itemPrice incorrectType")}
      <br />
      {prettyFieldName("Business EIN number")}
      <br />
      {prettyFieldName("hasEINPresent")}
    </div>
  );
};

export default App;

// function erlang_loop(i: number) {
//   console.log(123);
//   sleep(1000);
//   if ("newCode") {
//     erlang_loop2(i+1);
//   } else {
//     erlang_loop(i+1);
//   }
// }

// function erlang_loop2(i: number) {
//   console.log(321);
//   sleep(1000);
//   erlang_loop2(i);
// }

// PID = self()

// PID ! {123}
