import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "D:/MERN Project/project/src/styles/Theme.css"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

function AdminAnalytics({ complaints }) {

  const categories = [...new Set(complaints.map(c => c.category))];

  const categoryCount = categories.map(cat =>
    complaints.filter(c => c.category === cat).length
  );

  const statusCount = [
    complaints.filter(c => c.status === "Pending").length,
    complaints.filter(c => c.status === "In Progress").length,
    complaints.filter(c => c.status === "Resolved").length
  ];

  const barData = {
    labels: categories,
    datasets: [
      {
        label: "Complaints by Category",
        data: categoryCount,
        backgroundColor: "#1976d2"
      }
    ]
  };

  const pieData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        data: statusCount,
        backgroundColor: ["#ff9800", "#2196f3", "#4caf50"]
      }
    ]
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Analytics</h2>

      {complaints.length === 0 ? (
        <div className="glass-card">
          <p>No data available.</p>
        </div>
      ) : (
        <div className="analytics-wrapper">

          <div className="glass-card chart-card">
            <Bar data={barData} />
          </div>

          <div className="glass-card chart-card">
            <Pie data={pieData} />
          </div>

        </div>
      )}
    </div>
  );
}

export default AdminAnalytics;