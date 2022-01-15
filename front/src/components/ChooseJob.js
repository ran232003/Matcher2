import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './ChooseJob.css'
const ChooseJob = (props)=>{
  const [job,setJob] = useState("java");
  const [jobArray,setJobArray] = useState([]);
  const[jobInput,setJobInput] = useState({
    input:"",
    inputValid:false,
    lable:props.lable,
  });
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
    const handleChange = (e)=>{
      const input = e.target.value;
      setJob(input)
    }
    const handleInput = (event,value)=>{
      console.log("in job",value);
      setJobInput(()=>{
        return{input:value,inputValid:true}
      })
    }
    console.log("JobArray",jobArray);
    useEffect(()=>{
      getJobs();
    },[job])
    useEffect(()=>{
      props.handleInput(jobInput,props.lable);
    },[jobInput.input])
    return(
        <div className="job">
        <Autocomplete
        onChange={handleInput}
      disablePortal
      id="combo-box-demo"
      options={jobArray}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Choose Job" onChange = {handleChange} />}
    />
    </div>
  );
}
export default ChooseJob;