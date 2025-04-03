import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function Leaderboard({ tournamentId }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/picks/?tournament=${tournamentId}`)
      .then(res => res.json())
      .then(data => {
        // Group picks by email and calculate correct picks
        const userStats = data.reduce((acc, pick) => {
          if (!acc[pick.email]) {
            acc[pick.email] = { email: pick.email, correct: 0, total: 0 };
          }
          if (pick.is_correct) {
            acc[pick.email].correct++;
          }
          acc[pick.email].total++;
          return acc;
        }, {});

        // Convert to array and sort by correct picks
        const sortedLeaderboard = Object.values(userStats)
          .sort((a, b) => b.correct - a.correct);
        
        setLeaderboard(sortedLeaderboard);
      });
  }, [tournamentId]);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4 }}>Tournament Leaderboard</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Player</TableCell>
              <TableCell align="right">Correct Picks</TableCell>
              <TableCell align="right">Total Picks</TableCell>
              <TableCell align="right">Win Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((player, index) => (
              <TableRow key={player.email}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.email}</TableCell>
                <TableCell align="right">{player.correct}</TableCell>
                <TableCell align="right">{player.total}</TableCell>
                <TableCell align="right">
                  {((player.correct / player.total) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Leaderboard; 