//CRUD jobs

//Read all jobs
const getAlljobs = (req, res) => {
    res.send("all jobs");
}
const getjob = (req, res) => {
    res.send("one jobs");
}
const createjob = (req, res) => {
    res.send("created job");
}
const updatejob = (req, res) => {
    res.send("jobUpated");
}
const deletjob = (req, res) => {
    res.send("job deleted");
}


export { getAlljobs, getjob, createjob, updatejob, deletjob };