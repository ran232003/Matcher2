import React from 'react'
import './CandidatesFound.css'
import logo from './anonymousPic.png'
function CandidatesFound(props) {
  return (
    <div className = 'center'>
        <div className = 'users-list'>
          
               {props.candidates.map((item)=>{
                   return(
                    <div>
                    <li className = "user-item">
                    <div className =  "user-item__content">
                    <a>
                    <div className = "user-item__image">
                    <img className = "img" src = {logo}/>
                </div>
                <div className = "user-item__info">
                    <h2>{item.name}</h2>
                    <h3>{item.title}</h3>
                    {item.skills.map((skill)=>{
                        return(
                            <div className = 'mySkills'>
                            <p  className = 'mySkills'> {skill},</p>
                            </div>
                        )
                    })}
                </div>
                </a>
            </div>
        </li>
        </div>
                   )
               })}
        </div>
        </div>
  );
}

export default CandidatesFound;