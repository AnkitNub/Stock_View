import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./Stock.css";

const Stock = () => {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [filterData, setFilterData] = useState("1D"); //initially display 1D data on loading website

  useEffect(() => {
    fetchStock();
  }, [filterData]); 

  let sortedData = [];
  const fetchStock = () => {
    const StockSymbol = "IBN";
    const API_Call = `https://www.alphavantage.co/query?function=${filterData === "1D" ? "TIME_SERIES_INTRADAY": "TIME_SERIES_DAILY_ADJUSTED"
    }&symbol=${StockSymbol}${filterData === "1D" ? "&interval=5min" : ""}&outputsize=full&apikey=${process.env.REACT_APP_API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    fetch(API_Call)
      .then((response) => response.json())
      // console.log(response)
      .then((data) => {
        // console.log(data)
        if (data["Time Series (Daily)"] || data["Time Series (5min)"]) {
          if (filterData === "1D") {
            sortedData = Object.entries(data["Time Series (5min)"]).slice(0,80); //daily
            // console.log(sortedData);
          } else if (filterData === "1M") {
            sortedData = Object.entries(data["Time Series (Daily)"]).slice(0,30); //1 month
          } else if (filterData === "3M") {
            sortedData = Object.entries(data["Time Series (Daily)"]).slice(0,90); //3 month
          } else if (filterData === "1Y") {
            sortedData = Object.entries(data["Time Series (Daily)"]).slice(0,365); //1 year
          }
        }
        for (var [key, value] of sortedData) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(value["1. open"]);
        }
        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);
      });
  };

  return (
    <div>
      <h2 className='company'>ICICI</h2>
      <div className='graph'>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              // opacity: 0.7,
              "marker.colorbar": "#000000",
              type: "scatter",
              mode: "lines",
              marker: { color: "#01db33" },
            },
          ]}
          layout={{
            width: "900",
            height: "420",
            xaxis: { showgrid: false },
            yaxis: { showgrid: false },
            plot_bgcolor: "#070a1b",
            paper_bgcolor: "#070a1b",
            
          }}
          config={{ responsive: true }}
        />
      </div>
      <div className='filters'>
        <h5
          className={filterData === "1D" ? "active" : ""}
          onClick={() => {
            setFilterData("1D");
          }}>
          1D
        </h5>
        <h5
          className={filterData === "1M" ? "active" : ""}
          onClick={() => {
            setFilterData("1M");
          }}>
          1M
        </h5>
        <h5
          className={filterData === "3M" ? "active" : ""}
          onClick={() => {
            setFilterData("3M");
          }}>
          3M
        </h5>
        <h5
          className={filterData === "1Y" ? "active" : ""}
          onClick={() => {
            setFilterData("1Y");
          }}>
          1Y
        </h5>
      </div>
    </div>
  );
};

export default Stock;
