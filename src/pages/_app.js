// import Layout from '../components/Layout';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import theme from '../styles/theme';
// import '../styles/globals.css'; // Import global styles

// function App({ Component, pageProps }) {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <style jsx global>{`
//         body {
//           background-color: ${theme.palette.background.default};
//         }
//       `}</style>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </ThemeProvider>
//   );
// }

// export default App;



import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/globals.css'; // Import global styles

function App({ Component, pageProps }) {
  const router = useRouter();

  // Function to load Google Analytics script
  const loadGA = () => {
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-B6FMNC5LCK`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', 'G-B6FMNC5LCK');
    }
  };

  // Track page views
  useEffect(() => {
    loadGA(); // Load Google Analytics script

    const handleRouteChange = (url) => {
      window.gtag('config', 'G-B6FMNC5LCK', {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style jsx global>{`
        body {
          background-color: ${theme.palette.background.default};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
