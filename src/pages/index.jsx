import { Typography, Grid, Container, Card, CardContent, CardActionArea } from '@mui/material';
import Link from 'next/link';
import Layout from '../components/Layout';

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
            <Card>
              <CardActionArea component={Link} href="/about">
                <CardContent>
                  <img
                    src="/Foto Marieke.jpg"
                    alt="Lesbevordering"
                    style={{ width: "100%", height: "auto", objectFit: "cover" }} // Ensures the image fits the card
                  />
                  <Typography gutterBottom variant="h5" component="div">
                    Over mij
                  </Typography>
                  
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} href="/les-ideeen">
                <CardContent>
                  <img
                    src="/les-ideeen.png"
                    alt="Lesbevordering"
                    style={{ width: "100%", height: "auto", objectFit: "cover" }} // Ensures the image fits the card
                  />
                  <Typography gutterBottom variant="h5" component="div">
                    Les-ideeën
                  </Typography>
                  
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} href="/lesbevordering">
                <CardContent>
                  <img
                    src="/lesbevordering.png"
                    alt="Lesbevordering"
                    style={{ width: "100%", height: "auto", objectFit: "cover" }} // Ensures the image fits the card
                  />
                  <Typography gutterBottom variant="h5" component="div">
                    Lesbevordering
                  </Typography>
                  
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          
          
      {/* Grid layout for subject cards */}
      {/* <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
        <Box flexGrow={1} flexBasis="33.33%" p={1}>
          <Link href="/materials/math" passHref>
            <CardActionArea>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Mathhh
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Algebra, Geometry, Calculus, and more.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Link>
        </Box>
        <Box flexGrow={1} flexBasis="33.33%" p={1}>
          <Link href="/materials/science" passHref>
            <CardActionArea>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Science
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Physics, Chemistry, Biology, and more.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Link>
        </Box>
        <Box flexGrow={1} flexBasis="33.33%" p={1}>
          <Link href="/materials/history" passHref>
            <CardActionArea>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    History
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ancient, Medieval, and Modern history.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Link>
        </Box>
      </Box> */}
      </Grid>
    </Container>

  );
}
