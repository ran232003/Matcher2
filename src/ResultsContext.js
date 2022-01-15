import { createContext } from "react";

const ResultsContext = createContext({
    handleJob:()=>{},
    handleSkills:()=>{},
    skills:[],
    job:null,
    });

export default ResultsContext;