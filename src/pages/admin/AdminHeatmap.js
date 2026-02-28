import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "../../styles/Theme.css"

function AdminHeatmap({ complaints }) {

  const defaultCenter = [12.9716, 77.5946];

  return (
    <div className="page-container">
      <h2 className="page-title">Heatmap</h2>

      {complaints.length === 0 ? (
        <div className="glass-card">
          <p>No location data available.</p>
        </div>
      ) : (
        <div className="glass-card map-card">
          <MapContainer
            center={defaultCenter}
            zoom={12}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {complaints.map(c => {
              if (!c.latitude || !c.longitude) return null;

              return (
                <Circle
                  key={c._id}
                  center={[c.latitude, c.longitude]}
                  radius={300}
                  pathOptions={{
                    color: "red",
                    fillColor: "red",
                    fillOpacity: 0.4
                  }}
                />
              );
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default AdminHeatmap;