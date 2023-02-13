import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Watchlist.css";

const Watchlist = () => {
  const [stockData, setStockData] = useState([]);
  const companies = [
    {
      company: "HDFC",
      symbol: "HDB",
    },
    {
      company: "ICICI",
      symbol: "IBN",
    },
    {
      company: "IBM",
      symbol: "IBM",
    },
    {
      company: "DEUTSCHE",
      symbol: "DB",
    },
  ];
  //companies in the array are showed on the watchlist component -part2

  useEffect(() => {
    const fetchData = async () => {
      const newStockData = await Promise.all(
        companies.map(async (data) => {
          const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${data.symbol}&apikey=${process.env.REACT_APP_API_KEY}`;
          try {
            const response = await axios.get(url);
            // console.log(response)
            return { company: data.company, ...response.data["Global Quote"] };
          } catch (error) {
            console.log(error);
          }
        })
      );
      setStockData(newStockData);
    };

    fetchData();
  }, []);

  // console.log(stockData[0]["10. change percent"], stockData["05. price"],stockData)

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='topright'>
      <div className='top'>
        <h2>Watchlist</h2>
        <i class='fa-solid fa-chevron-down'></i>
      </div>
      {stockData.map((data, i) => {
        return (
          <div className='stock-container' key={i}>
            <p className='company-name'>{data.company}</p>
            <div className='right'>
              <p className='price'>${data["05. price"]}</p>
              <p
                className='change-percent'
                style={{
                  color: data["10. change percent"].startsWith("-")
                    ? "red"
                    : "green",
                }}>
                {data["10. change percent"]}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Watchlist;
