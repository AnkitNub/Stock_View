import React from "react";
import News from "./components/News";
import Stock from "./components/Stock";
import Navbar from "./components/Navbar";

import "./App.css";
import Watchlist from "./components/Watchlist";

const App = () => {
  return (
    <>
      <Navbar />
      <div className='main-container'>
        <Stock />
        <Watchlist />
        <News />
      </div>
    </>
  );
};

export default App;
