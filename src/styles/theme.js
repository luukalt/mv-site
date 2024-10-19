// theme.js

import { createTheme } from '@mui/material/styles';
import { Gloria_Hallelujah  } from 'next/font/google';

// // Load the Dancing Script font
// const dancingScript = Dancing_Script({
//   subsets: ['latin'],
//   weight: ['400', '700'],
// });

// Load the Indie Flower font
const GloriaHallelujah = Gloria_Hallelujah({
  subsets: ['latin'], 
  weight: ['400'], 
});

// Create a custom theme using MUI's createTheme function
const theme = createTheme({
  palette: {
    primary: {
      main: '#edb9a2', // Customize primary color
    },
    secondary: {
      main: '#074f5b', // Customize secondary color
    },
    background: {
      default: '#edb9a2', // Background color for the entire app
      paper: '#edb9a2', // Background for cards, app bar, etc.
    },
  },
  typography: {
    
    fontFamily: GloriaHallelujah.style.fontFamily,
    // fontFamily: GloriaHallelujah.style.fontFamily, // Use the loaded font
    h2: {
      // fontFamily: GloriaHallelujah.style.fontFamily, // Use the loaded font
      fontWeight: 700, // Custom font weight for h3
      // fontSize: '3rem', // Custom font size for h3
    },
    h3: {
      // fontFamily: GloriaHallelujah.style.fontFamily, // Use the loaded font
      fontWeight: 700, // Custom font weight for h3
      // fontSize: '2.4rem', // Custom font size for h3
    },
    h5: {
      // fontFamily: GloriaHallelujah.style.fontFamily, // Use the loaded font
      fontWeight: 600, // Custom font weight for h5
    },
    h6: {
      fontWeight: 500, // Custom font weight for h6
    },
    body1: {
      // fontFamily: GloriaHallelujah.style.fontFamily, // Use the loaded font
      fontSize: '1rem', // Default font size for body text
      lineHeight: 1.6, // Line height for better readability
    },
  },
  spacing: 10, // Base spacing unit
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#edb9a2', // Customize AppBar background
          height: '80px',
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
