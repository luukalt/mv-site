import { useState } from 'react';
import { AppBar, Toolbar, Button, Container, IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Dancing_Script, Indie_Flower  } from 'next/font/google';
import { styled } from '@mui/system';

// Load the Dancing Script font
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const indieFlower = Indie_Flower({
  subsets: ['latin'], // Specify the subsets you want to use
  weight: ['400'], // Specify the weights you want to use
});

const NameTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    left: 0,
  },
}));

const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar 
          sx={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center',
            height: '100px',
            width: '100%',
            margin: '0 auto', // Center the toolbar horizontally
          }}>
          <NameTypography variant="h6" sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem'}}>
            Marieke Versleijen
          </NameTypography>
          
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/" passHref>
                    <Button 
                  color="inherit" 
                  sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem' }} // Change font size here
                >
                      Home
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/about" passHref>
                    <Button 
                  color="inherit" 
                  sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem' }} // Change font size here
                >
                      Over mij
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/materials" passHref>
                    <Button 
                  color="inherit" 
                  sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem' }} // Change font size here
                >
                      Materiaal
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/materials2" passHref>
                    <Button 
                  color="inherit" 
                  sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem' }} // Change font size here
                >
                      Materiaal 2
                    </Button>
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, flexGrow: 0, marginLeft: 'auto' }}>
              <Link href="/" passHref>
                <Button 
                  color="inherit" 
                  sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem' }} // Change font size here
                >
                  Home
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button 
                  color="inherit" 
                  sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem' }} // Change font size here
                >
                  Over mij
                </Button>
              </Link>
              <Link href="/contents" passHref>
                <Button 
                  color="inherit" 
                  sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem' }} // Change font size here
                >
                  Materiaal
                </Button>
              </Link>
              <Link href="/materials2" passHref>
                <Button 
                  color="inherit" 
                  sx={{ fontFamily: indieFlower.style.fontFamily, fontSize: '1.5rem' }} // Change font size here
                >
                  Materiaal 2
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar