import "D:/MERN Project/project/src/styles/Theme.css"

function MapView({ complaints }) {

  return (
    <div className="page-container">
      <h2 className="page-title">Map View</h2>

      {complaints.map(c => (
        <div key={c._id} className="glass-card">
          📍 {c.location} - {c.title}
        </div>
      ))}
    </div>
  );
}

export default MapView;