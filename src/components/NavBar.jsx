import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Container, IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
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
      <Typography
        variant="h6"
        sx={{
          fontFamily: GloriaHallelujah.style.fontFamily,
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          cursor: 'pointer',
          color: 'white',
          '&:hover': { textDecoration: 'underline' },
          mt: isMobile? 2 : 1
        }}
      >
        Marieke Versleijen
      </Typography>
    </Link>
    
  );

  const NavButton = ({ href, children }) => (
    <Link href={href} passHref>
      <Button
        color="inherit"
        sx={{
          fontFamily: GloriaHallelujah.style.fontFamily,
          fontSize: '1.2rem',
          // borderBottom: isActive(href) ? '2px solid' : 'none',
          color: isActive(href) ? theme.palette.background.default : 'white',
          borderRadius: 0,
          '&:hover': { borderBottom: '2px solid' },
          bgcolor: isMobile? undefined : theme.palette.secondary.main, 
          paddingBottom: isMobile ? 0 : 1,
          paddingTop: isMobile ? 0 : 1,
          paddingLeft: isMobile ? 0 : 2,
          paddingRight: isMobile ? 0 : 2,
          display: 'flex',                 // Enable flexbox
          alignItems: 'center',            // Vertically center the content
          justifyContent: 'center',        // Horizontally center the content
          textAlign: 'center',             // Center the text
          clipPath: isMobile ? '' : 'inset(0px 0px 0px 0px round 20px 30px 60px 60px)'
        }}
      >
        {children}
      </Button>
    </Link>
  );

  const DesktopNav = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: 3}}>
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
        <MenuIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: theme.palette.secondary.main, // Match the AppBar's background color
            color: 'white', // Set text color to white to match the AppBar style
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
        boxShadow: 'none',    // Removes any shadow
        borderBottom: 'none',  // Ensures there's no bottom border
        bgcolor: isMobile ? theme.palette.secondary.main: theme.palette.primary.main,  // Set background color to match the rest of the navbar
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', height: isMobile ? '60px' : '80px' }}>
          {isMobile && <MobileNav />}
          <Box sx={isMobile ? { position: 'absolute', left: '50%', transform: 'translateX(-50%)'} : {bgcolor: theme.palette.secondary.main, padding: 4, clipPath: 'inset(10px 20px 10px 0px round 30px 40px 60px 80px)'}}>
            <Logo />
          </Box>
          {!isMobile && <DesktopNav />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;