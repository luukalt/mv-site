import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        color: 'white',
        py: 2,
        mt: 30,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Footer Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Navigatie
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="inherit" underline="hover">
                <Typography variant="h6" gutterBottom>
                    Home
                </Typography>
              </Link>
              <Link href="/over-mij" color="inherit" underline="hover">
                <Typography variant="h6" gutterBottom>
                    Over Mij
                </Typography>
              </Link>
              <Link href="/leesbevordering" color="inherit" underline="hover">
                <Typography variant="h6" gutterBottom>
                    Leesbevordering
                </Typography>
              </Link>
              <Link href="/lesideeen" color="inherit" underline="hover">
                <Typography variant="h6" gutterBottom>
                    Lesideeën
                </Typography>
                
              </Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: <Link href="mailto:mariekeversleijen@outlook.com" color="inherit">mariekeversleijen@outlook.com</Link>
            </Typography>
            {/* <Typography variant="body2">Telefoon: +31 6 12345678</Typography> */}
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Volg mij
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* <Link href="https://facebook.com" target="_blank" rel="noopener" color="inherit">
                <FacebookIcon />
              </Link> */}
              <Link href="https://www.instagram.com/mariekeversleijen" target="_blank" rel="noopener" color="inherit">
                <InstagramIcon />
              </Link>
              {/* <Link href="https://twitter.com" target="_blank" rel="noopener" color="inherit">
                <TwitterIcon />
              </Link> */}
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom Section */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            pt: 2,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Marieke Versleijen. Alle rechten voorbehouden.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
