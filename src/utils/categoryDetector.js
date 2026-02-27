export const detectCategory = (description) => {
  const desc = description.toLowerCase();

  if (desc.includes("road")) return "Road Repair";
  if (desc.includes("light")) return "Streetlight";
  if (desc.includes("garbage")) return "Sanitation";
  return "General";
};

export const assignDepartment = (category) => {
  if (category === "Road Repair") return "Road Department";
  if (category === "Streetlight") return "Electrical Department";
  if (category === "Sanitation") return "Sanitation Department";
  return "General Department";
};