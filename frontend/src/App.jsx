import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/auth/Dashboard';
import TournamentsList from './components/TournamentsList';
import PickGames from './components/PickGames';
import Leaderboard from './components/Leaderboard';
import PaymentPage from './components/PaymentPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* New routes for our components */}
          <Route path="/tournaments" element={<TournamentsList />} />
          <Route path="/tournaments/:id/pick" element={<PickGames />} />
          <Route path="/tournaments/:id/leaderboard" element={<Leaderboard />} />
          <Route path="/tournaments/:id/payment" element={<PaymentPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
