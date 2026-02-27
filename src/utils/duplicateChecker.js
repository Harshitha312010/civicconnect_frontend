export const checkDuplicate = (complaints, newComplaint) => {
  return complaints.find(
    c =>
      c.location === newComplaint.location &&
      c.category === newComplaint.category
  );
};