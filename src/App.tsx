import React, {useState} from 'react';
import Header from "./components/Header";
import Banner from "./components/Banner";
import Users from "./components/Users";
import FormSection from "./components/FormSection";

function App() {
    const [queryPick, setQueryPick] = useState<boolean>(false)
    const handlePick = () => setQueryPick(!queryPick)

  return (
    <div className="App">
        <Header/>
        <Banner/>
        <Users pick={queryPick}/>
        <FormSection pickFunc={handlePick}/>
    </div>
  );
}

export default App;
