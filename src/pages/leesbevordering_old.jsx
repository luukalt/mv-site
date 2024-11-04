// pages/content.jsx

import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import fs from 'fs';
import path from 'path';

const ContentPage = ({ contentItems = [] }) => { // Default to empty array if undefined
  return (
    <Container maxWidth="lg" sx={{ my: 2, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontSize: '2.5rem' }}>
        Leesbevordering
      </Typography>

      {/* <Typography variant="body1" sx={{ mb: 2, fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 'bold' }}>
        ‘Quote.’
      </Typography> */}

      <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
        Klik op de afbeelding voor de uitleg en het materiaal.
      </Typography>

      <Grid container spacing={2}>
        {contentItems.length > 0 ? (
          contentItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.name}>
              {/* <Box
                sx={{
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    borderRadius: '20px',
                    border: '2px solid #000'
                    
                  },
                }}
              >
                <a href={`/contents/leesbevordering/${item.name}.pdf`} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`/contents/leesbevordering/${item.name}.png`} // Use .jpg or .png based on your file type
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'fill',
                      borderRadius: '19px',
                    }}
                  />
                </a>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {item.name}
                </Typography>
              </Box> */}
              <Box
                sx={{
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    borderRadius: '20px',
                    border: '2px solid #000'
                  },
                }}
              >
                <a
                  href={`https://raw.githubusercontent.com/luukalt/mv-site/main/public/contents/leesbevordering/${item.name}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://raw.githubusercontent.com/luukalt/mv-site/main/public/contents/leesbevordering/${item.name}.png`} // Use .jpg or .png based on your file type
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'fill',
                      borderRadius: '19px',
                    }}
                  />
                </a>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            No content available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

// // Fetch content items from public/contents directory
// export async function getStaticProps() {
//   const contentsDir = path.join(process.cwd(), 'public', 'contents', 'leesbevordering');
  
//   // Check if directory exists
//   if (!fs.existsSync(contentsDir)) {
//     return {
//       props: {
//         contentItems: [], // Return empty array if the directory doesn't exist
//       },
//     };
//   }

//   const files = fs.readdirSync(contentsDir);

//   // Filter out the PDF files and keep only the names without extensions
//   const contentItems = files
//     .filter((file) => file.endsWith('.jpg') || file.endsWith('.png')) // Adjust based on your image types
//     .map((file) => ({ name: path.parse(file).name })); // Extract names without extensions

//   return {
//     props: {
//       contentItems, // Pass content items to the page
//     },
//   };
// }

// Fetch content items from public/contents directory
export async function getStaticProps() {
  const contentsDir = path.join(process.cwd(), 'public', 'contents', 'leesbevordering');
  
  // Check if directory exists
  if (!fs.existsSync(contentsDir)) {
    return {
      props: {
        contentItems: [], // Return empty array if the directory doesn't exist
      },
    };
  }

  const files = fs.readdirSync(contentsDir);

  // Filter out the image files and keep only the names without extensions
  let contentItems = files
    .filter((file) => file.endsWith('.jpg') || file.endsWith('.png')) // Adjust based on your image types
    .map((file) => ({ name: path.parse(file).name })); // Extract names without extensions

  // Sort the contentItems, placing items with "poster" in the filename at the beginning
  contentItems = contentItems.sort((a, b) => {
    const aHasPoster = a.name.toLowerCase().includes('poster');
    const bHasPoster = b.name.toLowerCase().includes('poster');

    if (aHasPoster && !bHasPoster) {
      return -1; // "a" comes before "b"
    } else if (!aHasPoster && bHasPoster) {
      return 1; // "b" comes before "a"
    } else {
      return 0; // No change in order
    }
  });

  return {
    props: {
      contentItems, // Pass content items to the page
    },
  };
}


export default ContentPage;
