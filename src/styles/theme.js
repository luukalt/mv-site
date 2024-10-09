import { createTheme } from '@mui/material/styles';
// import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import { Dancing_Script  } from 'next/font/google'

// const dancingScript = Dancing_Script({
//   subsets: ['latin'], // Specify the subsets you want to use
//   weight: ['400', '700'], // Specify the weights you want to use
// });

// Create a custom theme using MUI's createTheme function
let theme = createTheme({
  palette: {
    primary: {
      main: '#fffdee', // Customize primary color (default: blue)
    },
    secondary: {
      main: '#ff5722', // Customize secondary color (default: orange)
    },
    background: {
      default: '#fffdee', // Background color for the entire app
      paper: '#fffdee', // Background for cards, app bar, etc.
    },
  },
  typography: {
    // fontFamily: dancingScript,
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
  spacing: 10, // Base spacing unit (default is 8px)
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fffdee', // Customize AppBar background
          height: '64px',
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

// theme = responsiveFontSizes(theme);

export default theme;
