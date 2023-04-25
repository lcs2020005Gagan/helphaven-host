import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Amount in Rs"],
  ["2018", 3000],
  ["2019", 6000],
  ["2020", 7770],
  ["2021", 13000],
  ["2022", 22000],
];

export const options = {
  title: "Company Performance",
  hAxis: { title: "Year", titleTextStyle: { color: "#fff" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
  backgroundColor:"black",
  legendTextStyle: { color: '#FFF' },
  titleTextStyle: { color: '#FFF' },
  hAxis: {
    color: '#FFF',
  },
  vaxis:{
    color:'white',
  },
  colors:["yellow"],
  hAxis: {
    textStyle:{color: '#FFF'}
  },
  vAxis: {
    textStyle:{color: '#FFF'}
  }
};

export default function App() {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}