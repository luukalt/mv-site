import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';

const GITHUB_REPO = 'luukalt/mv-site';
const CONTENTS_PATH = 'public/contents/leesbevordering';

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
                {index === 0 && ( // Add "Nieuw" sticker only to the newest item
                  <img
                    src="/nieuw.png" // Update this path to your image location
                    alt="Nieuw"
                    style={{
                      position: 'absolute',
                      bottom: '60px',
                      right: '10px',
                      width: '150px',  // Adjust width and height as needed
                      height: 'auto',
                      borderRadius: 10
                    }}
                  />
                )}
                <a
                  href={`https://raw.githubusercontent.com/luukalt/mv-site/main/public/contents/leesbevordering/${item.name}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://raw.githubusercontent.com/${GITHUB_REPO}/main/${CONTENTS_PATH}/${item.name}.png`}
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
  const fileListResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENTS_PATH}`);
  const files = await fileListResponse.json();

  // Fetch the latest commit dates for each file
  const contentItems = await Promise.all(
    files
      .filter((file) => file.name.endsWith('.jpg') || file.name.endsWith('.png'))
      .map(async (file) => {
        const commitResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/commits?path=${CONTENTS_PATH}/${file.name}&per_page=1`
        );
        const commits = await commitResponse.json();
        const lastModified = commits[0]?.commit?.committer?.date || null;

        return {
          name: file.name.split('.').slice(0, -1).join('.'),
          updated_at: lastModified,
        };
      })
  );

  // Sort items by last modified date, newest first
  contentItems.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return {
    props: {
      contentItems: contentItems.map(({ updated_at, ...rest }) => rest), // Exclude updated_at from props
    },
  };
}

export default ContentPage;
