import { createTheme } from '@mui/material/styles';

// Create a custom theme using MUI's createTheme function
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color (default: blue)
    },
    secondary: {
      main: '#ff5722', // Customize secondary color (default: orange)
    },
    background: {
      default: '#f5f5f5', // Background color for the entire app
      paper: '#ffffff', // Background for cards, app bar, etc.
    },
  },
  typography: {
    h3: {
      fontWeight: 700, // Custom font weight for h3
      fontSize: '2.4rem', // Custom font size for h3
    },
    h5: {
      fontWeight: 600, // Custom font weight for h5
    },
    h6: {
      fontWeight: 500, // Custom font weight for h6 (used for mobile titles)
    },
    body1: {
      fontSize: '1rem', // Default font size for body text
      lineHeight: 1.6, // Line height for better readability
    },
  },
  spacing: 8, // Base spacing unit (default is 8px)
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2', // Customize AppBar background
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg', // Default maximum width for Container components
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for cards
          borderRadius: '12px', // Rounded corners for cards
        },
      },
    },
  },
});

export default theme;
