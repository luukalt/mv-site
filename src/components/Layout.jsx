import { Container, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './NavBar';

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if the screen is small (mobile)

  return (
    <>
      {/* Navbar Component */}
      <Navbar />
      
      {/* Main Content Container */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: isMobile ? 2 : 4,  // Adjust top margin for mobile
          mb: isMobile ? 2 : 4,  // Adjust bottom margin for mobile
          padding: isMobile ? 1 : 3 // Reduce padding on mobile
        }}
      >
        {children}
      </Container>
    </>
  );
}
