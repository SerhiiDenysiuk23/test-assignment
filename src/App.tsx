import React from 'react';
import Header from "./components/Header";
import Banner from "./components/Banner";
import Users from "./components/Users";
import FormSection from "./components/FormSection";

function App() {
  return (
    <div className="App">
        <Header/>
        <Banner/>
        <Users/>
        <FormSection/>
    </div>
  );
}

export default App;
