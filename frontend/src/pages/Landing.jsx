import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';

function Landing() {
  return (
    <Box>
      {/* Hero Section - Full-width background image */}
      <Box 
        sx={{
          height: '90vh',
          position: 'relative',
          backgroundImage: 'url("/images/hero-bg.jpg")', // Need: A dramatic baseball stadium shot, preferably at sunset/night with lights on
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text readability
          }
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', position: 'relative' }}>
          <Box 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                mb: 2
              }}
            >
              PICK TO WIN
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              Daily MLB Predictions. Real Rewards.
            </Typography>
            <Box>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  mr: 2, 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.2rem',
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                Start Playing
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.2rem',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 6
            }}
          >
            HOW IT WORKS
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Pick Your Tournament",
                description: "Enter daily contests starting at just 100 coins",
                image: "/images/tournament.jpg" // Need: Baseball scoreboard or tournament bracket image
              },
              {
                title: "Make Your Predictions",
                description: "Select winners for each MLB game of the day",
                image: "/images/predictions.jpg" // Need: Baseball player at bat or pitching image
              },
              {
                title: "Win Big",
                description: "Top players split the prize pool daily",
                image: "/images/trophy.jpg" // Need: Trophy or celebration image
              }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box 
                    sx={{
                      height: 200,
                      backgroundImage: `url(${step.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Tournament Section */}
      <Box 
        sx={{ 
          py: 10,
          backgroundImage: 'url("/images/stadium-bg.jpg")', // Need: Baseball stadium interior shot, blurred
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography 
            variant="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              mb: 6
            }}
          >
            TODAY'S TOURNAMENT
          </Typography>
          <Card 
            sx={{ 
              maxWidth: 500,
              mx: 'auto',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                MLB Daily Challenge
              </Typography>
              <Box sx={{ my: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Entry Fee
                </Typography>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                  100 COINS
                </Typography>
              </Box>
              <Box sx={{ my: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Prize Pool
                </Typography>
                <Typography variant="h3" color="secondary" sx={{ fontWeight: 'bold' }}>
                  1,000 COINS
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                sx={{ 
                  mt: 2,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}
              >
                JOIN TOURNAMENT
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Attribution Footer */}
      <Box 
        sx={{ 
          py: 2, 
          px: 3,
          bgcolor: 'grey.900',
          color: 'grey.500',
          fontSize: '0.75rem'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            Image Credits:
            <br />
            Win Big Image: Photo by{' '}
            <a 
              href="https://unsplash.com/@jimmy_conover?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              style={{ color: 'inherit' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Jimmy Conover
            </a>
            {' '}on{' '}
            <a 
              href="https://unsplash.com/photos/people-watching-baseball-SEQ2VI0KI6A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              style={{ color: 'inherit' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
            <br />
            Predictions Image:{' '}
            <a 
              href="https://www.vecteezy.com/free-photos/accounting"
              style={{ color: 'inherit' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Accounting Stock photos by Vecteezy
            </a>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Landing;