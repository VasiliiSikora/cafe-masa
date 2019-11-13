import React from 'react';
import Header from "./components/header/Header";
import GuestsTable from "./components/guests_table/GuestsTable";
import Footer from "./components/footer/Footer"

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <GuestsTable/>
      <Footer/>
    </div>
  );
}

export default App;
