import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ChooseJob from "../components/ChooseJob";
import ChooseSkills from "../components/ChooseSkills";
import Input from "../components/Input";
import './AddWorker.css'
const AddWorker = (props)=>{
    const [inputs,setInputs]= useState({
        name:"",
        lastName:"",
        email:"",
        skills:[],
        job:"",
        nameValid:false,
        lastNameValid:false,
        emailValid:false,
        jobValid:false,
        skillsValid:false
    })
    const handleSubmit = async(event)=>{
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/match/addCandidate",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name:inputs.name, 
            lastName:inputs.lastName,
            email:inputs.email,
            job:inputs.job,
            skills:inputs.skills
        })
        })
        const data = await response.json();
        console.log(data);


    }
    const handleInput = (inputObject,lable)=>{
        console.log("inputObject",inputObject,lable)
        if(inputObject.lable === "Name"){
            setInputs(()=>{
                return{...inputs,name:inputObject.input,nameValid:inputObject.inputValid}
            })
        }
        else if(inputObject.lable === "Last Name"){
            setInputs(()=>{
                return{...inputs,lastName:inputObject.input,lastNameValid:inputObject.inputValid}
            })
        }
        else if(inputObject.lable === "Email"){
            setInputs(()=>{
                return{...inputs,email:inputObject.input,emailValid:inputObject.inputValid}
            })
        }
        else if(lable === "Skills"){
            console.log("in skills",inputObject.input)
            setInputs(()=>{
                return{...inputs,skills:inputObject.input,skillsValid:inputObject.inputValid}
            })
        }
        else if(lable === "Job"){
            setInputs(()=>{
                return{...inputs,job:inputObject.input,jobValid:inputObject.inputValid}
            })
        }
    }
    console.log("in add worker",inputs);
    return(
        <div>
            <form className = 'movie-form'>
            <Input
            lable = 'Name'
            handleInput = {handleInput}
            />
            <Input
            lable = 'Last Name'
            handleInput = {handleInput}
            />
            <Input
            lable = 'Email'
            handleInput = {handleInput}
            />
           <ChooseJob
           lable = 'Job'
           handleInput = {handleInput}
           />
           <ChooseSkills
           lable = 'Skills'
           handleInput = {handleInput}
           />
            <Button 
            onClick={handleSubmit}
            >
                Submit
                </Button>
            </form>
        </div>
    )
}
export default AddWorker;