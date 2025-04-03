import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { API_ENDPOINTS } from '../config/api';

function TournamentsList() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.TOURNAMENTS)
      .then(res => res.json())
      .then(data => setTournaments(data));
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4 }}>Available Tournaments</Typography>
      <Grid container spacing={3}>
        {tournaments.map(tournament => (
          <Grid item xs={12} md={4} key={tournament.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tournament #{tournament.id}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Start: {new Date(tournament.start_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  End: {new Date(tournament.end_date).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Entry Fee: ${tournament.entry_fee}
                </Typography>
                <Typography variant="h6" color="primary">
                  Prize Pool: ${tournament.pot_total}
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => window.location.href = `/tournament/${tournament.id}`}
                >
                  Enter Tournament
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default TournamentsList; 