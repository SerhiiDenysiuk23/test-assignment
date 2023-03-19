import React, {lazy, useState, Suspense} from 'react';
import Header from "./components/Header";
import FormSection from "./components/FormSection";

const Banner = lazy(() => import ("./components/Banner"))
const Users = lazy(() => import ("./components/Users"))

function App() {
    const [queryPick, setQueryPick] = useState<boolean>(false)
    const handlePick = () => setQueryPick(!queryPick)

    return (
        <div className="App">
            <Header/>
            <Suspense fallback={<div className={"preload"}><img src="./preloader.png" alt="loading..."/></div>}>
                <Banner/>
                <Users pick={queryPick}/>
            </Suspense>
            <FormSection pickFunc={handlePick}/>
        </div>
    );
}

export default App;
