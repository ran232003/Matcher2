import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap';
import ResultsContext from '../ResultsContext';
import './FindSkills.css'
const FindSkills = ({skills})=>{
    const[chooseSkills,setChooseSkills] = useState([])
    const[dbSkills,setDbSkills] = useState();
    const context = useContext(ResultsContext);
    const handleSelect = (event)=>{
        const chooseskill = event.target.innerHTML;
        const found = chooseSkills.find((item)=>{
            return item === chooseskill
        })
        if(found){
            return;
        }
        let arrSkills = [...chooseSkills,chooseskill] 
        setChooseSkills(()=>{
            return [...chooseSkills,chooseskill];
        })
        context.handleSkills(arrSkills)

    }
    const closeSkill = (skill)=>{
        let temp = chooseSkills.filter(item=>item !== skill)
        setChooseSkills(temp)
        context.handleSkills(temp)
    }
    useEffect(()=>{
       setChooseSkills([]); 
    },[skills])
    const fetchSkills = async()=>{
        const response = await fetch("http://localhost:5000/api/match/skills",{})
        const data = await response.json();
        const skillsName = data.skills.map((skill)=>{
            return skill.name;
        })
        setDbSkills(skillsName);
    }
    useEffect(()=>{
        fetchSkills();
    },[])
   
     if(skills.length < 1){
        return(
            <div></div>
        ) ;
    }
    else{
    return(
             
        <div className = 'findSkills'>
            <div className = 'searchJob'>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Find Skills
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {dbSkills.map((item)=>{
                return <Dropdown.Item onClick = {handleSelect} eventKey= {item}>{item}</Dropdown.Item>
            })}
                    </Dropdown.Menu>
            </Dropdown>
            </div>
            <div className = 'skills'>
            <div className = 'model'>
            {!context.job?null:
            chooseSkills.map((item)=>{
                return(<div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title" id="exampleModalLabel">
                    {item}
                  </p>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={()=>{closeSkill(item)}}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                
              </div>)
            })
            }
            </div>
            </div>
        </div>
        
    )}
}
export default FindSkills;