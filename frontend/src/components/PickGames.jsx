import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';

function PickGames({ tournamentId }) {
  const [games, setGames] = useState([]);
  const [picks, setPicks] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/games/?tournament=${tournamentId}`)
      .then(res => res.json())
      .then(data => setGames(data));
  }, [tournamentId]);

  const handlePick = (gameId, team) => {
    setPicks(prev => ({ ...prev, [gameId]: team }));
  };

  const submitPicks = () => {
    Object.entries(picks).forEach(([gameId, pickTeam]) => {
      fetch("http://127.0.0.1:8000/api/picks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          tournament: tournamentId, 
          game: gameId, 
          pick_team: pickTeam, 
          email: "user@example.com" // This should be replaced with actual user email
        }),
      });
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Make Your Picks</Typography>
      <Grid container spacing={3}>
        {games.map(game => (
          <Grid item xs={12} md={6} key={game.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {game.team_home} vs {game.team_away}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Game Date: {new Date(game.game_date).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant={picks[game.id] === game.team_home ? "contained" : "outlined"}
                    onClick={() => handlePick(game.id, game.team_home)}
                    fullWidth
                  >
                    Pick {game.team_home}
                  </Button>
                  <Button 
                    variant={picks[game.id] === game.team_away ? "contained" : "outlined"}
                    onClick={() => handlePick(game.id, game.team_away)}
                    fullWidth
                  >
                    Pick {game.team_away}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button 
        variant="contained" 
        size="large" 
        sx={{ mt: 4 }}
        onClick={submitPicks}
        disabled={Object.keys(picks).length !== games.length}
      >
        Submit All Picks
      </Button>
    </Box>
  );
}

export default PickGames; 