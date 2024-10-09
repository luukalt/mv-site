import { useState } from 'react';
import { AppBar, Toolbar, Button, Container, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Dancing_Script, Indie_Flower  } from 'next/font/google';

// Load the Dancing Script font
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const indieFlower = Indie_Flower({
  subsets: ['latin'], // Specify the subsets you want to use
  weight: ['400'], // Specify the weights you want to use
});

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
      <Container maxWidth="md">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
            <Box sx={{ display: 'flex', gap: 5 }}>
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