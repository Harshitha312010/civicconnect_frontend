import { useState } from "react";
import { detectCategory, assignDepartment } from "../../utils/categoryDetector";
import { checkDuplicate } from "../../utils/duplicateChecker";

function ComplaintForm({ complaints, setComplaints }) {

  const [data, setData] = useState({
    description: "",
    location: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = detectCategory(data.description);
    const department = assignDepartment(category);

    const newComplaint = {
      id: Date.now(),
      ...data,
      category,
      department,
      status: "Pending",
      reports: 1,
      createdAt: new Date(),
      resolvedAt: null,
      rating: null
    };

    const duplicate = checkDuplicate(complaints, newComplaint);

    if (duplicate) {
      const updated = complaints.map(c =>
        c.id === duplicate.id
          ? { ...c, reports: c.reports + 1 }
          : c
      );
      setComplaints(updated);
      alert("Duplicate merged");
    } else {
      setComplaints([...complaints, newComplaint]);
      alert("Complaint Submitted");
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