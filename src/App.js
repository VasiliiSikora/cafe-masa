import React from 'react';
import Header from "./components/header/Header";
import GuestsTable from "./components/guests_table/GuestsTable";
import Footer from "./components/footer/Footer"

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import FilterMarketingButton from "./components/buttons/FilterMarketingButton";
import SortTotalSpendButton from "./components/buttons/SortTotalSpendButton";
import SortTotalCountButton from "./components/buttons/SortTotalCountButton";


function App() {
  return (
    <div className="App">
      <Header/>
      <FilterMarketingButton/>
      <SortTotalSpendButton/>
      <SortTotalCountButton/>
      <GuestsTable />
      <Footer/>
    </div>
  );
}

export default App;
