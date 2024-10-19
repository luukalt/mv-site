import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Gloria_Hallelujah, Indie_Flower } from 'next/font/google';

const GloriaHallelujah = Gloria_Hallelujah({ subsets: ['latin'], weight: ['400'] });
const IndieFlower = Indie_Flower({ subsets: ['latin'], weight: ['400'] });

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#FF914C',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: '#074f5b',
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 40%)',
          padding: '2rem',
          color: 'white',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: IndieFlower.style.fontFamily,
            fontWeight: 700,
            color: 'black',
            marginBottom: 2,
          }}
        >
          Marieke Versleijen
        </Typography>
        <Box
          component="img"
          src="/house-icon.png"
          alt="House Icon"
          sx={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
          }}
        />
        {/* Photo Section */}
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            right: '5%',
            width: '200px',
            height: '250px',
            backgroundImage: `url('/marieke-photo.jpg')`, // Use the path to your image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
          }}
        />
      </Box>

      {/* Introduction Section */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: GloriaHallelujah.style.fontFamily,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 1,
          }}
        >
          Hi, ik ben Marieke!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: GloriaHallelujah.style.fontFamily,
            color: '#fff',
            marginBottom: 4,
          }}
        >
          Laat alle kinderen ervaren hoe leuk lezen is.
        </Typography>
      </Container>

      {/* Buttons Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { text: 'Over mij', href: '/about' },
          { text: 'lees-bevordering', href: '/leesbevordering' },
          { text: 'les-ideeën', href: '/les-ideeen' },
        ].map((button) => (
          <Button
            key={button.text}
            href={button.href}
            variant="contained"
            sx={{
              width: '150px',
              height: '150px',
              borderRadius: '100%',
              backgroundColor: '#FF914C',
              color: 'black',
              fontFamily: GloriaHallelujah.style.fontFamily,
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#ffa04c',
              },
            }}
          >
            {button.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
