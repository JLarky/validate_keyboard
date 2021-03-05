import React from "react";

/*
Given an user input, display a message if the input can be typed using letters of only one row on a keyboard. 

Extra credit: Include the option for a user to pick the type of keyboard they are using (querty, azerty, etc)!

Example: (Using QWERTY - US Layout https://en.wikipedia.org/wiki/QWERTY)
  isValid(‘candy’)
  isValid(‘doodle’)
  isValid(‘pop’)             // True
  isValid(‘shield’)
  isValid(‘lag’)               // True
  isValid(‘typewriter’)  // True
*/

const types = ["querty", "azerty", "zwerty"] as const;
type KeyboardType = typeof types[number];

const keyDB = new Map<KeyboardType, string[]>();
keyDB.set("querty", ["qwertyuiop", "asdfghjkl", "zxcvbnm"]);
keyDB.set("azerty", ["azertyuiop", "qsdfghjklm", "wxcvbn"]);
keyDB.set("zwerty", ["qwertzuiop", "asdfghjkl", "yxcvbnm"]);

function isValid(str: string, type: KeyboardType = "querty") {
  const keys = keyDB.get(type);
  if (keys === undefined) {
    throw new Error(`wrong keyboard type ${type}`);
  }
  let rowUsed: number | undefined = undefined;
  const hasMultipleRows = str.split("").some((key) => {
    const rowIndex = keys.findIndex((row) => row.match(key));
    if (rowUsed === undefined) {
      rowUsed = rowIndex;
    } else {
      if (rowIndex !== rowUsed) {
        // we have new row that wasn't used before, so we need to exit here
        return true;
      }
    }
    return false;
  });
  return !hasMultipleRows;
}

function isKbType(type: string): type is KeyboardType {
  return types.includes(type as KeyboardType);
}

export const App: React.FC = () => {
  const [keyboardType, setKeyboardType] = React.useState<KeyboardType>(
    "querty"
  );
  const [inputValue, setInputValue] = React.useState("");
  const valid = React.useMemo(() => isValid(inputValue, keyboardType), [
    inputValue,
    keyboardType,
  ]);

  return (
    <div className="m-10">
      <h1 className="text-2xl my-8">
        Type something and we will see if that's easy to type
      </h1>
      <input
        type="text"
        className="border"
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
      />
      <select
        className="uppercase"
        onChange={(e) => {
          const newValue = e.target.value;
          if (isKbType(newValue)) {
            setKeyboardType(newValue);
          }
        }}
      >
        {types.map((key) => {
          return <option key={key}>{key}</option>;
        })}
      </select>
      <div className="my-4 text-red-800">
        {valid ? "" : "You are using too many keyboard rows!"}
      </div>
    </div>
  );
};

export default App;
