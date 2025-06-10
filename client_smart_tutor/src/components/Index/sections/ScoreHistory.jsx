import React, { useState, useEffect } from 'react';

export default function ScoreHistory({ username }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchScores();
  }, [username]);

  const fetchScores = async () => {
    if (!username) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/get-scores/${username}`);
      const data = await res.json();

      // Sort by most recent
      const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setScores(sorted);

      // Stats calculation
      if (sorted.length > 0) {
        const totalGames = sorted.length;
        const bestScore = Math.max(...sorted.map(s => s.score));
        const avgScore = (sorted.reduce((sum, s) => sum + s.score, 0) / totalGames).toFixed(2);
        setStats({ totalGames, bestScore, avgScore });
      } else {
        setStats(null);
      }
    } catch (error) {
      console.error("Failed to fetch scores:", error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete all score history?")) return;

    try {
      const res = await fetch(`http://localhost:3000/delete-scores/${username}`, {
        method: "DELETE"
      });
      const result = await res.json();
      console.log("Deleted:", result.message);
      setScores([]);
      setStats(null);
    } catch (error) {
      console.error("Failed to delete scores:", error);
    }
  };

  if (!username) {
    return <p>Please log in to view your score history.</p>;
  }

  if (loading) {
    return <p>Loading score history...</p>;
  }

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', textAlign: 'center' }}>
      <h2>📜 {username}'s Score History</h2>

      {stats && (
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Total Games:</strong> {stats.totalGames}</p>
          <p><strong>Best Score:</strong> {stats.bestScore}</p>
          <p><strong>Average Score:</strong> {stats.avgScore}</p>
        </div>
      )}

      <button onClick={handleDelete} style={{ marginBottom: '15px', background: 'red', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
        🗑️ Delete All Scores
      </button>

      {scores.length === 0 ? (
        <p>No game history found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr>
              <th>Score</th>
              <th>Correct</th>
              <th>Attempts</th>
              <th>Played On</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, idx) => (
              <tr key={idx}>
                <td>{s.score}</td>
                <td>{s.correctAnswers}</td>
                <td>{s.attempts}</td>
                <td>{new Date(s.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
