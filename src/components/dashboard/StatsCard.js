function StatsCard({ title, value, color }) {
  return (
    <div style={{
      backgroundColor: color,
      padding: "20px",
      borderRadius: "10px",
      width: "200px",
      color: "#333",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default StatsCard;