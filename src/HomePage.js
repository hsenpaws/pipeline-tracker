import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { getExchangeRate } from "./requests";
//import { getRecordsPerPartitoin } from "./readline";
import "./HomePage.css";
import { Bar } from "react-chartjs-2";

function HomePage() {
  const [rates, setRates] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [date, setDate] = useState("");
  const [base, setBase] = useState("");
  const [pipe, setPipe] = useState("");
  const [chartData, setChartData] = useState({});

  const getRates = async () => {
    const response = await getExchangeRate();
	//const response = await getRecordsPerPartitoin();
    const { base, date, rates } = response.data;
	
	//Setting to constant for timebeing, eventuall this needs to come from the Query
	const temp_pipe = 'USAGE'
	
	setPipe(temp_pipe);
	setRates(rates);
    setDate(date);
    setBase(base);
    const filteredRates = Object.keys(rates).filter(key => rates[key] < 50);
    const data = {
      labels: filteredRates,
      datasets: [
        {
          backgroundColor: "green",
          data: filteredRates.map(key => rates[key]),
        },
      ],
    };
    setChartData(data);
    setInitialized(true);
  };

  useEffect(() => {
    if (!initialized) {
      getRates();
    }
  });
  const options = {
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { beginAtZero: true } }],
    },
    title: {
      display: true,
      text: "Records Per Day",
    },
  };

  return (
    <div className="home-page">
      <h1 className="center">{pipe} Status as of {date}</h1>
      <br />
      <div style={{ height: "400px", width: "90vw", margin: "0 auto" }}>
        <Bar data={chartData} options={options} />
      </div>
      <br />
      {Object.keys(rates).map(key => {
        return (
          <Card style={{ width: "90vw", margin: "0 auto" }}>
            <Card.Body>
              <Card.Title>
                {base} : {key}
              </Card.Title>
              <Card.Text>{rates[key]}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default HomePage;
