import { useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

function PaymentPage({ tournamentId, entryFee }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(entryFee);

  const handlePayment = () => {
    fetch("http://127.0.0.1:8000/api/payments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tournament: tournamentId,
        email: email,
        amount: amount,
        is_verified: false // This would be set to true after actual payment processing
      }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle successful payment
      window.location.href = `/tournament/${tournamentId}/picks`;
    })
    .catch(error => {
      console.error("Payment failed:", error);
    });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Tournament Entry Payment
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please enter your email and confirm the payment amount to enter the tournament.
          </Typography>
          
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled
            sx={{ mb: 3 }}
          />
          
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handlePayment}
            disabled={!email}
          >
            Pay ${amount} to Enter Tournament
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PaymentPage; 