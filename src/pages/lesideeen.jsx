import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { storage, ref, listAll, getDownloadURL, getMetadata } from '../../firebase';

const CACHE_KEY = 'contentItems_lesideeen';
const CACHE_EXPIRATION_KEY = 'cacheExpiration_lesideeen';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const ContentPage = ({ initialContentItems }) => {
  const [contentItems, setContentItems] = useState(initialContentItems);

  useEffect(() => {
    const cachedContentItems = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
    const cacheExpiration = localStorage.getItem(CACHE_EXPIRATION_KEY);
  
    setContentItems(cachedContentItems.length > 0 ? cachedContentItems : initialContentItems);
  
    if (!cacheExpiration || Date.now() > parseInt(cacheExpiration, 10)) {
      fetchContentItems(); // Refresh cache in the background
    }
  }, []);

  const fetchContentItems = async () => {
    try {
      const listRef = ref(storage, 'contents/lesideeen'); // Explicitly set to `lesideeen`
      const list = await listAll(listRef);
      const newContentItems = [];

      for (const item of list.items) {
        const itemUrl = await getDownloadURL(item);
        const metadata = await getMetadata(item);
        const itemName = item.name.split('.').slice(0, -1).join('.');

        if (item.name.endsWith('.png')) {
          newContentItems.push({
            name: itemName,
            pdfUrl: itemUrl.replace('.png', '.pdf'),
            imageUrl: itemUrl,
            order: metadata.customMetadata?.order ? parseInt(metadata.customMetadata.order, 10) : 0,
          });
        }
      }

      newContentItems.sort((a, b) => a.order - b.order);

      localStorage.setItem(CACHE_KEY, JSON.stringify(newContentItems));
      localStorage.setItem(CACHE_EXPIRATION_KEY, (Date.now() + CACHE_DURATION_MS).toString());
      setContentItems(newContentItems);
    } catch (error) {
      console.error('Error fetching content from Firebase Storage:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 2, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontSize: '2.5rem' }}>
        Lesideeën
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 'bold' }}>
        ‘Ga vandaag nog met een boek aan de slag in de klas!’
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
        Klik op de afbeelding om naar het lesidee te gaan.
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
                    border: '2px solid #000',
                  },
                }}
              >
                {index === 0 && (
                  <img
                    src="/nieuw.png"
                    alt="Nieuw"
                    style={{
                      position: 'absolute',
                      bottom: '60px',
                      right: '10px',
                      width: '150px',
                      height: 'auto',
                      borderRadius: 10,
                    }}
                  />
                )}
                <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
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

// Fetch data on the server side
export async function getStaticProps() {
  const contentItems = await fetchContentItemsServer();
  return {
    props: {
      initialContentItems: contentItems,
    },
  };
}

// Helper function to fetch content items on the server side
async function fetchContentItemsServer() {
  const contentItems = [];

  try {
    const listRef = ref(storage, 'contents/lesideeen'); // Explicitly set to `lesideeen`
    const list = await listAll(listRef);

    for (const item of list.items) {
      const itemUrl = await getDownloadURL(item);
      const metadata = await getMetadata(item);
      const itemName = item.name.split('.').slice(0, -1).join('.');

      if (item.name.endsWith('.png')) {
        contentItems.push({
          name: itemName,
          pdfUrl: itemUrl.replace('.png', '.pdf'),
          imageUrl: itemUrl,
          order: metadata.customMetadata?.order ? parseInt(metadata.customMetadata.order, 10) : 0,
        });
      }
    }

    contentItems.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching content from Firebase Storage:', error);
  }

  return contentItems;
}

export default ContentPage;
