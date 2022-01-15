import logo from './logo.svg';
import './App.css';
import Introduction from './components/Introduction';
import FindCandidates from './components/FindCandidates';
import Results from './components/Results';
import ResultsContext from './ResultsContext';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Hompage';
import NavigationBar from './components/NavigationBar';
import AddWorker from './Pages/AddWorker';
import DeleteWorker from './Pages/DeleteWorker';

function App() {
  const [job,setJob] = useState()
  const[skills,setSkills] = useState([])
  const handleJob = (jobTitle)=>{
    if(!jobTitle){
      return setJob();
    }
    setJob(jobTitle)
  }
  const handleSkills = (skills)=>{
    setSkills(skills)
  }
  return (
    <BrowserRouter>
    <ResultsContext.Provider value = {{handleSkills:handleSkills,handleJob:handleJob,job:job,skills:skills}}>
      <NavigationBar/>
    <Routes>
    <Route path = "/" element={<HomePage
      handleJob = {handleJob}
      />} />
      <Route path = "AddWorker" element={<AddWorker
    
      />} />
      <Route path = "DeleteWorker" element={<DeleteWorker
    
      />} />
      
      </Routes>
    </ResultsContext.Provider>
   
    </BrowserRouter>
  );
}

export default App;
