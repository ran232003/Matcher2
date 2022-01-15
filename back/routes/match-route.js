const { getCandidates, getJobs, getSkills, req2,getJobsTitle, addCandidate } = require('../controllers/match-controller');

express = require('express');
const router = express.Router();
//cehcking\
router.post("/candidates",getCandidates);
router.get("/jobs",getJobs);
router.get("/skills",getSkills);
router.get("/skills2/:skill",req2);
router.get("/jobTitles/:job",getJobsTitle);
router.post("/addCandidate",addCandidate);

module.exports = router