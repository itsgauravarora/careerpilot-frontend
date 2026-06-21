import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [stats, setStats] = useState(null);
    const [searchCompany, setSearchCompany] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [status, setStatus] = useState("Applied");
    const [applicationDate, setApplicationDate] = useState("");
    const [notes, setNotes] = useState("");
const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchJobs();
    fetchStats();

  }, []);
  const fetchJobs = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data);

      setJobs(response.data);

    } catch (error) {

      console.error(error);

    }
  };
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
const editJob = (job) => {

  setEditingId(job.id);

  setCompanyName(job.companyName);
  setJobTitle(job.jobTitle);
  setStatus(job.status);
  setApplicationDate(job.applicationDate);
  setNotes(job.notes);
};
const addJob = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    if (editingId) {

      await API.put(
        `/jobs/${editingId}`,
        {
          companyName,
          jobTitle,
          status,
          applicationDate,
          notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    } else {

      await API.post(
        "/jobs",
        {
          companyName,
          jobTitle,
          status,
          applicationDate,
          notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }

    fetchJobs();
    fetchStats();

    setEditingId(null);

    setCompanyName("");
    setJobTitle("");
    setStatus("Applied");
    setApplicationDate("");
    setNotes("");

  } catch (error) {

    console.error(error);

  }
};
const deleteJob = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await API.delete(`/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchJobs();
    fetchStats();

  } catch (error) {

    console.error(error);

  }
};
const searchJobs = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await API.get(
      `/jobs/search?company=${searchCompany}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setJobs(response.data);

  } catch (error) {

    console.error(error);

  }
};
const fetchStats = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await API.get(
      "/jobs/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setStats(response.data);

  } catch (error) {

    console.error(error);

  }
};
  return (
    <div className="dashboard-container">

     <div style={{ textAlign: "right" }}>
       <button onClick={handleLogout}>
         Logout
       </button>
     </div>

      <h1>🚀 CareerPilot AI</h1>
      <h3>Your Personal Job Application Tracker</h3>
      {stats && (
        <div className="stats-container">

         <div className="stat-card total-card">
            <h3>Total Jobs</h3>
            <h2>{stats.totalJobs}</h2>
          </div>

         <div className="stat-card applied-card">
            <h3>Applied</h3>
            <h2>{stats.appliedJobs}</h2>
          </div>

        <div className="stat-card interview-card">
            <h3>Interview</h3>
            <h2>{stats.interviewJobs}</h2>
          </div>

         <div className="stat-card offer-card">
            <h3>Offer</h3>
            <h2>{stats.offerJobs}</h2>
          </div>

          <div className="stat-card rejected-card">
            <h3>Rejected</h3>
            <h2>{stats.rejectedJobs}</h2>
          </div>
          <hr />

        </div>
      )}

      <div className="form-card">

      <h2>Add Job</h2>

      <form onSubmit={addJob}>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <br /><br />

        <input
          type="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <br /><br />

<button type="submit">
  {editingId ? "Update Job" : "Add Job"}
</button>

      </form>

      </div>

      <hr />
      <h2>Search Jobs</h2>

      <input
        type="text"
        placeholder="Search Company"
        value={searchCompany}
        onChange={(e) => setSearchCompany(e.target.value)}
      />

    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>

      <button onClick={searchJobs}>
        Search
      </button>

      <button
        onClick={() => {
          setSearchCompany("");
          fetchJobs();
        }}
      >
        Reset
      </button>

    </div>

      <hr />

      <h2>Job Applications</h2>

     {jobs.map((job) => (
       <div className="job-card" key={job.id}>

         <h3>{job.companyName}</h3>
         <p>{job.jobTitle}</p>
        <span className="status-badge">
          {job.status}
        </span>

         <div className="action-buttons">

           <button
             className="edit-btn"
             onClick={() => editJob(job)}
           >
             Edit
           </button>

           <button
             className="delete-btn"
             onClick={() => {
               if (window.confirm("Delete this job?")) {
                 deleteJob(job.id);
               }
             }}
           >
             Delete
           </button>

           <button
             className="reset-btn"
             onClick={() => {
               setSearchCompany("");
               fetchJobs();
             }}
           >
             Reset
           </button>

         </div>

         <hr />

       </div>
     ))}
    </div>
    
  );
}

export default Dashboard;