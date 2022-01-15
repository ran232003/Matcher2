import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './ChooseJob.css'

const ChooseSkills = (props)=>{
    const[skill,setSkill] = useState("software");
    const[skillsApi,setSkillsApi] = useState([]);
    const[skillsObject,setSkillsObject] = useState({
      input:[],
        inputValid:false,
        lable:props.lable
    });
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
    ]
    const handleInput = (event,value)=>{
       console.log("value",value);
        //getting array of values
        if(value.length>=1){
          setSkillsObject(()=>{
            return {input:value,inputValid:true}
          })
        }else{
          setSkillsObject(()=>{
            return {input:value,inputValid:false}
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
        getSkills()
    },[skill])
    useEffect(()=>{
      props.handleInput(skillsObject,props.lable)
    },[skillsObject.input])
    console.log("lable",props.lable);

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