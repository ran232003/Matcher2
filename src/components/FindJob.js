import React, { useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap';
import './FindCandidates.css'
const FindJob = (props)=>{
    const[chooseJob,setChooseJob] = useState()
    const handleSelect = (event)=>{
        const jobSelect = event.target.innerHTML
        setChooseJob(jobSelect)
        props.handleJob(jobSelect);

    }
    const closeJob = (job)=>{
        setChooseJob()
        props.handleJob();
    }
    return(
        <div>
            <div className = 'searchJob'>
            
            <Dropdown>
                <Dropdown.Toggle  variant="success" id="dropdown-basic">
                    Find Job
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {props.jobsTitle.map((item)=>{
                return <Dropdown.Item onClick = {handleSelect} eventKey= {item}>{item}</Dropdown.Item>
            })}
                    </Dropdown.Menu>
            </Dropdown>
           
            </div>
            {!chooseJob?null:
            <div className = 'model'>
            <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title" id="exampleModalLabel">
                {chooseJob}
              </p>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={()=>{closeJob(chooseJob)}}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            
          </div>
          </div>
        }
                
              
            
            
            </div>
       
    )
}
export default FindJob;