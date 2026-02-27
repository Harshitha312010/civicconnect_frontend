export const detectCategory = (description) => {
  const desc = description.toLowerCase();

  if (desc.includes("road")) return "Road";
  if (desc.includes("light")) return "Electricity";
  if (desc.includes("garbage")) return "Garbage";
  if (desc.includes("water")) return "Water";
  return "Other";
};

export const assignDepartment = (category) => {
  if (category === "Road") return "Road Department";
  if (category === "Electricity") return "Electrical Department";
  if (category === "Garbage") return "Sanitation Department";
  if (category === "Water") return "Water Department";
  return "General Department";
};