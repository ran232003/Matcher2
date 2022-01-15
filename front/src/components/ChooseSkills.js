import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './ChooseJob.css'

const ChooseSkills = (props)=>{
    const[skill,setSkill] = useState("software");
    const[skillsApi,setSkillsApi] = useState([]);
    const[skillsObject,setSkillsObject] = useState({
      skillsArray:[],
      skillsValid:false,
      lable:props.label
    });
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
    ]
    const handleInput = (event,value)=>{
       
        //getting array of values
        if(value.length>=1){
          setSkillsObject(()=>{
            return {skillsArray:value,skillsValid:true}
          })
        }else{
          setSkillsObject(()=>{
            return {skillsArray:value,skillsValid:false}
          })
        }
        
    }
    const handleChange = (e)=>{
      let value = e.target.value;
      setSkill(value);
    }
    const getSkills = async()=>{
        const res = await fetch(`http://localhost:5000/api/match/skills2/${skill}`);
        const data = await res.json()
        console.log(data);
        setSkillsApi(data.skills);
    }
    useEffect(()=>{
        console.log("in effect");
        getSkills()
    },[skill])
    useEffect(()=>{
      props.handleInput(skillsObject)
    },[skillsObject.skillsArray])
    
    return(
        <div className="job">
        <Autocomplete
        onChange={handleInput}
      multiple
      id="combo-box-demo"
      options={skillsApi}
      sx={{ width: 300 }}
      renderInput={(params) =>{       
        
          return(
      <TextField {...params} label="Choose Skills" onChange={handleChange} />)
    }
    }
    />
    </div>
  );
    
}
export default ChooseSkills;