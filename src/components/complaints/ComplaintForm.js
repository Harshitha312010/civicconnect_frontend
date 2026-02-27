import { useState } from "react";
import axios from "axios";
import { detectCategory, assignDepartment } from "../../utils/categoryDetector";
import { checkDuplicate } from "../../utils/duplicateChecker";

function ComplaintForm({ complaints, setComplaints }) {

  const [data, setData] = useState({
    description: "",
    location: ""
  });

  const API_URL = "https://civicconnect-backend-2.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category = detectCategory(data.description);
    const department = assignDepartment(category);

    const newComplaint = {
      ...data,
      category,
      department,
      status: "Pending"
    };

    // Optional frontend duplicate check (UX only)
    const duplicate = checkDuplicate(complaints, newComplaint);

    if (duplicate) {
      alert("Similar complaint already exists.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/issues`,
        newComplaint,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComplaints([...complaints, response.data]);

      alert("Complaint Submitted");

    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Error submitting complaint");
      }
    }

    setData({ description: "", location: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Describe issue"
        value={data.description}
        onChange={(e)=>setData({...data, description:e.target.value})}
        required
      />
      <input
        placeholder="Location"
        value={data.location}
        onChange={(e)=>setData({...data, location:e.target.value})}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ComplaintForm;