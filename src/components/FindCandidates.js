import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap';
import './FindCandidates.css'
import FindJob from './FindJob';
import FindSkills from './FindSkills';
import jobs2 from '../dummyJobs';
import ResultsContext from '../ResultsContext';
const FindCandidates = (props)=>{
    const contex = useContext(ResultsContext)
    const[jobs,setJobs] = useState([]);
    const[jobsTitleDb,setJobsTitleDb] = useState([]);
    const[skills,setSkills] = useState([]);
    const[jobValid ,setJobValid] = useState(false)
    const jobsTitle = jobs2.map((job)=>{
        return job.title;
    })
    const fetchJobs = async()=>{
        const response = await fetch('http://localhost:5000/api/match/jobs',{});
        const data = await response.json();

        let jobsRes = data.jobs.map((item)=>{
            return item.title;
        })
        setJobs(data.jobs)
        setJobsTitleDb(jobsRes);
    }
    
    const handleJob = (jobTitle)=>{
        if(!jobTitle){
            setJobValid(false);
            props.handleJob();
        }
        let jobSkill = [];
        jobs.forEach((job)=>{
            if(job.title === jobTitle ){
                jobSkill = job.skills
                setJobValid(jobTitle);
                props.handleJob(jobTitle);
                return
            }
        })
        
        setSkills(jobSkill);
        
    }
    useEffect(()=>{
        fetchJobs();
    },[])
    const submit=()=>{

    }
    return(
        <form>
           <FindJob
           jobsTitle = {jobsTitleDb}
           handleJob = {handleJob}
           />
           <FindSkills
           skills = {skills}
           />
           <div className = 'center'>
           
           </div>
        </form>
    )
}
export default FindCandidates;