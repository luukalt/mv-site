import { Typography, Grid, Container, Box, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if the screen is small (mobile)

  return (
    <Container sx={{ marginTop: 4, textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          mt: 4,
          flexDirection: isMobile ? 'column' : 'row', // Make content stack vertically on mobile
        }}
      >
        {/* Left Content: Text */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start', // Center text on mobile
            flex: 1,
            mb: isMobile ? 4 : 0, // Add bottom margin on mobile for spacing
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: isMobile ? '3rem' : '5rem', // Adjust font size for mobile
              fontWeight: 'bold',
              textAlign: isMobile ? 'center' : 'left', // Center text on mobile
            }}
          >
            Hi, ik ben Marieke!
          </Typography>
          <Typography
            variant="h2"
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              fontSize: isMobile ? '2rem' : '3rem', // Adjust font size for mobile
              textAlign: isMobile ? 'center' : 'left', // Center text on mobile
            }}
          >
            Laat alle kinderen ervaren hoe leuk lezen is!
          </Typography>
        </Box>

        {/* Right Content: Image */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 2, md: 0 }, // Adds some margin on top for mobile
          }}
        >
          <Box
            component="img"
            src="/Foto Marieke.jpg" // Replace with your image path
            alt="Marieke"
            sx={{
              width: isMobile ? '250px' : '400px', // Adjust image size for mobile
              height: isMobile ? '250px' : '400px', // Adjust image size for mobile
              borderRadius: '50%', // Makes the image round
              objectFit: 'cover', // Ensures the image is properly contained within the circle
            }}
          />
        </Box>
      </Box>
      
      <Grid container spacing={3} sx={{ marginTop: 2, justifyContent: isMobile ? 'flex-start' : 'center' }}>
        {/* Card 1 - Left on Mobile, Center on Larger Screens */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'center' }}
        >
          <Box
            component={Link}
            href="/about"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobile ? '200px' : '250px',
              height: isMobile ? '200px' : '250px',
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'secondary.main',
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Box
              component="img"
              src="/overmij.png"
              alt="Over mij"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>

        {/* Card 2 - Right on Mobile, Center on Larger Screens */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: 'flex', justifyContent: isMobile ? 'flex-end' : 'center' }}
        >
          <Box
            component={Link}
            href="/leesbevordering"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobile ? '200px' : '250px',
              height: isMobile ? '200px' : '250px',
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'secondary.main',
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Box
              component="img"
              src="/leesbevordering2.png"
              alt="Leesbevordering"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>

        {/* Card 3 - Left on Mobile, Center on Larger Screens */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'center' }}
        >
          <Box
            component={Link}
            href="/les-ideeen"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobile ? '200px' : '250px',
              height: isMobile ? '200px' : '250px',
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'secondary.main',
              overflow: 'hidden',
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Box
              component="img"
              src="/les-ideeen2.png"
              alt="Les-ideeen"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
