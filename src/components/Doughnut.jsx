import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Domain", "Donations in Rs."],
  ["Health", 11000],
  ["Animals", 21000],
  ["Shelter", 9000],
  ["Clothes", 2000],
  ["Education", 30000],
];

export const options = {
  title: "Donations Distribution",
  is3D: true,
  backgroundColor: 'black',
  legendTextStyle: { color: '#FFF' },
  titleTextStyle: { color: '#FFF' },
  hAxis: {
    color: '#FFF',
  }
};

export default function App() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
