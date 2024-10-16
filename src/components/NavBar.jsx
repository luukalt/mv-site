import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Container, IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Indie_Flower } from 'next/font/google';

const indieFlower = Indie_Flower({ subsets: ['latin'], weight: ['400'] });

const menuItems = [
  { text: 'Home', href: '/' },
  { text: 'Over mij', href: '/about' },
  { text: 'Les-ideeën', href: '/les-ideeen' },
  { text: 'Lesbevordering', href: '/lesbevordering' },
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
          fontFamily: indieFlower.style.fontFamily,
          fontSize: '1.5rem',
          cursor: 'pointer',
          '&:hover': { textDecoration: 'underline' },
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
          fontFamily: indieFlower.style.fontFamily,
          fontSize: '1.2rem',
          borderBottom: isActive(href) ? '2px solid' : 'none',
          color: isActive(href) ? 'white' : 'black',
          borderRadius: 0,
          '&:hover': { borderBottom: '2px solid' },
        }}
      >
        {children}
      </Button>
    </Link>
  );

  const DesktopNav = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: 2 }}>
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
        sx={{ position: 'absolute', left: 16 }}
      >
        <MenuIcon />
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
    <AppBar position="static">
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', height: isMobile ? '60px' : '80px' }}>
          {isMobile && <MobileNav />}
          <Box sx={isMobile ? { position: 'absolute', left: '50%', transform: 'translateX(-50%)' } : {}}>
            <Logo />
          </Box>
          {!isMobile && <DesktopNav />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;