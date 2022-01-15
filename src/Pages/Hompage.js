import React from "react";
import FindCandidates from "../components/FindCandidates";
import Introduction from "../components/Introduction";
import Results from "../components/Results";

const HomePage = (props)=>{

    return(
        <div>
              <div className="AppClass">
     <div className = 'search'>
     <Introduction/>
     <FindCandidates
     handleJob = {props.handleJob}
     />
     </div>
     <div className = 'results'>
     <Results/>
     </div>
    </div>
        </div>
    )
}
export default HomePage;