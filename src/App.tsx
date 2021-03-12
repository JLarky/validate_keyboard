/*
Create a grid that displays countries sorted by new covid cases, you can retrieve the information from the free public API https://api.covid19api.com/summary

Some things to consider:
1) The grid has to be responsive (1 col on mobile, 3 col on Desktop)
2) Cells should display the country full information on hover (Name, NewConfirmed, NewDeaths, etc)
3) Implement a Search bar to filter countries by name

Extra:
4) Add a Dropdown to allow the users to sort by NewCases, NewDeaths, TotalCases, TotalDeaths.
5) Users can select up to 2 countries by clicking the flags, if 2 countries are selected then we should display the difference between the "NewConfirmed" Cases (see API response)


To render the flags you just need to modify the flag-icon-XX class name with the 2 letter country code ,example:
<div class="flag-icon-background flag-icon-us"/>


For rendering flags:

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/css/flag-icon.min.css">
*/

import React from "react";

import "./App.css";

type CountryData = {
  CountryCode: string;
  NewConfirmed: number;
  NewDeaths: number;
  TotalConfirmed: number;
};

export const App: React.FC = () => {
  const [contriesData, setContriesData] = React.useState<CountryData[]>([
    // TODO: REMOVE
    {
      CountryCode: "us",
      NewConfirmed: 123,
      NewDeaths: 123,
      TotalConfirmed: 123,
    },
  ]);
  const fetchData = async () => {
    const res = await fetch("https://api.covid19api.com/summary");
    const data = await res.json();
    setContriesData(
      (data.Countries as CountryData[]).sort(
        (a, b) => b.TotalConfirmed - a.TotalConfirmed
      )
    );
  };
  const [selectedA, setSelectedA] = React.useState<string>();
  const [selectedB, setSelectedB] = React.useState<string>();
  React.useEffect(() => {
    fetchData();
  }, []);
  const difference = React.useMemo(() => {
    const a = contriesData.find((c) => selectedA === c.CountryCode);
    const b = contriesData.find((c) => selectedB === c.CountryCode);
    if (a && b) {
      return a.NewConfirmed - b.NewConfirmed;
    }
  }, [contriesData, selectedA, selectedB]);
  return (
    <div className="bg-gray-200">
      {selectedA && selectedA ? (
        <>{difference}</>
      ) : (
        <>Click on the flags to compare contries</>
      )}
      <div className="flex flex-wrap flex-row">
        {contriesData.map(({ CountryCode, NewConfirmed, NewDeaths }) => {
          const isSelected =
            CountryCode === selectedA || CountryCode === selectedB;
          return (
            <div
              key={CountryCode}
              className={`flag w-full md:w-1/3 h-28 my-2 flag-icon-background flag-icon-${CountryCode.toLowerCase()} ${
                isSelected ? "border border-red-500" : ""
              }`}
              onClick={() => {
                if (!selectedA) {
                  setSelectedA(CountryCode);
                } else if (!selectedB) {
                  setSelectedB(CountryCode);
                }
              }}
            >
              <div className="flag-info h-28 w-40 mx-auto bg-white bg-opacity-75 p-4">
                New confirmed:
                <br />
                {NewConfirmed}
                <br />
                New deaths:
                <br />
                {NewDeaths}
                <br />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
