import React from 'react';
import Header from "./components/header/Header";
import GuestsTable from "./components/guests_table/GuestsTable";
import Footer from "./components/footer/Footer"

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header/>
        <Container fluid={true}>
          <div className="intro-text" style={{textAlign: "left"}}>
              <p>A simple tabular display of  guest data information pulled from a JSON file.</p>
          </div>
          <GuestsTable/>
        </Container>
      <Footer/>
    </div>
  );
}

export default App;
