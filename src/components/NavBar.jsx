import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Container, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Gloria_Hallelujah } from 'next/font/google';

const GloriaHallelujah = Gloria_Hallelujah({ subsets: ['latin'], weight: ['400'] });

const menuItems = [
  { text: 'Home', href: '/' },
  { text: 'Over mij', href: '/about' },
  { text: 'Les-ideeën', href: '/les-ideeen' },
  { text: 'Leesbevordering', href: '/leesbevordering' },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const isActive = (href) => router.pathname === href;

  const Logo = () => (
    <Link href="/" passHref>
      <Box
        component="a"
        sx={{
          display: 'flex',
          alignItems: 'center',  // Vertically center the logo
          height: '100%',
        }}
      >
        <img
          src={`/mv-logo.png`}
          alt="Marieke Versleijen Logo"
          style={{
            width: isMobile ? '200px' : '200px',
            height: 'auto', // Ensure the height scales properly
            objectFit: 'contain',
            cursor: 'pointer',
          }}
        />
      </Box>
    </Link>
  );

  const NavButton = ({ href, children }) => (
    <Link href={href} passHref>
      <Button
        color="inherit"
        sx={{
          fontFamily: GloriaHallelujah.style.fontFamily,
          fontSize: '1.5rem',
          color: isActive(href) ? 'white' : 'black',
          borderRadius: 0,
          '&:hover': { borderBottom: '2px solid' },
          display: 'flex', // Enable flexbox for alignment
          alignItems: 'center', // Vertically center the content
          justifyContent: 'center', // Horizontally center the content
          height: '100%', // Match the height to ensure vertical alignment
        }}
      >
        {children}
      </Button>
    </Link>
  );

  const DesktopNav = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center', // Vertically center the navigation buttons
        gap: 3, // Space between navigation items
        height: '100%', // Ensure full height for alignment
      }}
    >
      {menuItems.map((item) => (
        <NavButton key={item.href} href={item.href}>
          {item.text}
        </NavButton>
      ))}
    </Box>
  );

  const MobileNav = () => (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        sx={{ position: 'absolute', left: 32, top: 16 }}
      >
        <MenuIcon sx={{ fontSize: '2rem', color: theme.palette.secondary.main }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.href} onClick={handleMenuClose} selected={isActive(item.href)}>
            <NavButton href={item.href}>{item.text}</NavButton>
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'none',
        borderBottom: 'none',
        bgcolor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center', // Vertically center the content
            height: '100px', // Set a fixed height for consistency
            paddingY: 2,
          }}
        >
          {isMobile && <MobileNav />}
          <Logo />
          {!isMobile && <DesktopNav />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
