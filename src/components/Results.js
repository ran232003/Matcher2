import React, { useContext, useEffect, useState } from 'react'
import CandidatesFound from './CandidatesFound';
import './Results.css'
import candidates from '../dummyCandidates';
import ResultsContext from '../ResultsContext';
function Results() {
    const[candidatesDb,setCandidatesDb] = useState();
    const context = useContext(ResultsContext);
    const fetchCandidates = async()=>{
        const response = await fetch('http://localhost:5000/api/match/candidates',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                job : context.job,
                skills:context.skills 
              }),
        })
        const data = await response.json();
        let sortArray = data.candidates.map((candidate)=>{
            candidate.rating = 0;
            if(candidate.title ===context.job){
                candidate.rating = 5
            }
            candidate.skills.forEach((candidateSkill)=>{
                context.skills.forEach((skill)=>{
                    if(candidateSkill === skill){
                        candidate.rating++;
                        return;
                    }
                })
            })
            return candidate; 
        })
        sortArray.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        setCandidatesDb(sortArray)
    }

    useEffect(()=>{
        if(context.job){
            fetchCandidates()
        }
        else{
            setCandidatesDb();
        }
        
    },[context.job,context.skills])
  return (
    <div className = 'center'>
            <div className = 'info'>
            <h1>
                Results
            </h1>
            <h5>
               
                </h5>
            </div>
            {!candidatesDb?null:
            
                <div>
                
                <CandidatesFound
                candidates = {candidatesDb}
                />
            </div>
            
            }
            
        </div>
  );
}

export default Results;