import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint for small screens

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
            justifyContent: 'space-evenly', // Ensure the title and buttons/menu are spaced
            alignItems: 'center', // Center items vertically
          }}
        >
          {/* <Typography variant="h6" sx={{ flexGrow: 1, textAlign: isMobile ? 'left' : 'center' }}>
            School Materials
          </Typography> */}
          
          {/* Mobile Menu */}
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
                    <Button color="inherit">Home</Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/about" passHref>
                    <Button color="inherit">About</Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/materials" passHref>
                    <Button color="inherit">Materials</Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/materials2" passHref>
                    <Button color="inherit">Materials2</Button>
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            // Desktop Menu
            <Box sx={{ display: 'flex', gap: 5 }}>
              <Link href="/" passHref>
                <Button color="inherit">Home</Button>
              </Link>
              <Link href="/about" passHref>
                <Button color="inherit">About</Button>
              </Link>
              <Link href="/materials" passHref>
                <Button color="inherit">Materials</Button>
              </Link>
              <Link href="/materials2" passHref>
                <Button color="inherit">Materials2</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
