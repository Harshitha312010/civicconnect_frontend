export const checkDuplicate = (complaints, newComplaint) => {
  return complaints.find(
    c =>
      c.location?.toLowerCase().trim() ===
      newComplaint.location?.toLowerCase().trim() &&
      c.category === newComplaint.category &&
      c.status !== "Resolved"
  );
};