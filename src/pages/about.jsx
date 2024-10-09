// pages/about.jsx

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to my About page! I'm excited to share a bit about myself and my work.
        I have a passion for [insert your passion or expertise here]. 
        This website showcases my projects, skills, and experiences.
      </Typography>
      {/* <Box sx={{ mb: 4 }}>
        <img
          src="/path/to/your/image.jpg" // Replace with your image path
          alt="About Me"
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </Box> */}
      <Typography variant="body2" paragraph>
        Connect with me on Instagram!
      </Typography>
      <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
        <InstagramIcon sx={{ fontSize: 40, color: '#E4405F', display: 'block', margin: '0 auto' }} />
      </a>
    </Container>
  );
};

export default AboutPage;
