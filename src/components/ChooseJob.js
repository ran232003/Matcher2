import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './ChooseJob.css'
const ChooseJob = (props)=>{
  const [job,setJob] = useState("java");
  const [jobArray,setJobArray] = useState([]);
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
    ]
    const getJobs = async()=>{
      const res = await fetch(`http://localhost:5000/api/match/jobTitles/${job}`)
      const data = await res.json()
      setJobArray(data.jobs);
    }
    const handleInput = (e)=>{
      const input = e.target.value;
      setJob(input)
    }
    console.log("JobArray",jobArray);
    useEffect(()=>{
      getJobs();
    },[job])
    return(
        <div className="job">
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={jobArray}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Choose Job" onChange = {handleInput} />}
    />
    </div>
  );
}
export default ChooseJob;