import { Typography, Grid, Container, Card, CardContent, CardActionArea } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container sx={{ marginTop: 4, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom display="flex" justifyContent="center" alignItems="center">
        Welkom op de site van Marieke Versleijen
      </Typography>
      <Typography variant="h5" display="flex" justifyContent="center" alignItems="center">
        Hier vind je mijn les-ideeën, lesmateriaal en inspiratie voor je lessen.
      </Typography>

      <Grid container spacing={3} display="flex" marginTop={2}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea component={Link} href="/about">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img
                  src="/Foto Marieke.jpg"
                  alt="Lesbevordering"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
                  Over mij
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea component={Link} href="/les-ideeen">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img
                  src="/les-ideeen.png"
                  alt="Les-ideeën"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
                  Les-ideeën
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea component={Link} href="/lesbevordering">
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img
                  src="/lesbevordering.png"
                  alt="Lesbevordering"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
                  Lesbevordering
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
