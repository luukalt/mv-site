import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { storage, ref, listAll, getDownloadURL } from '../../firebase'; // Adjust the path as needed

const ContentPage = ({ contentItems = [] }) => {
  return (
    <Container maxWidth="lg" sx={{ my: 2, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontSize: '2.5rem' }}>
        Leesbevordering
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
        Klik op de afbeelding voor de uitleg en het materiaal.
      </Typography>

      <Grid container spacing={2}>
        {contentItems.length > 0 ? (
          contentItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.name}>
              <Box
                sx={{
                  position: 'relative',
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
                {index === 0 && (
                  <img
                    src="/nieuw.png" // Update this path to your image location
                    alt="Nieuw"
                    style={{
                      position: 'absolute',
                      bottom: '60px',
                      right: '10px',
                      width: '150px',
                      height: 'auto',
                      borderRadius: 10
                    }}
                  />
                )}
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.imageUrl}
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

export async function getStaticProps() {
  const contentItems = [];

  try {
    // Reference to the specific folder in Firebase Storage
    const listRef = ref(storage, 'contents/leesbevordering');
    const list = await listAll(listRef);

    // Retrieve URLs for PDFs and images
    for (const item of list.items) {
      const itemUrl = await getDownloadURL(item);
      const itemName = item.name.split('.').slice(0, -1).join('.');

      if (item.name.endsWith('.pdf')) {
        contentItems.push({
          name: itemName,
          pdfUrl: itemUrl,
          imageUrl: itemUrl.replace('.pdf', '.png') // Assuming the image file has the same name but with a .png extension
        });
      }
    }

    // Sort items by name or any other criteria
    contentItems.sort((a, b) => (a.name > b.name ? -1 : 1));
  } catch (error) {
    console.error('Error fetching content from Firebase Storage:', error);
  }

  return {
    props: {
      contentItems,
    },
  };
}

export default ContentPage;