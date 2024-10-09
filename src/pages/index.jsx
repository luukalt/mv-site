import { Typography, Grid, Container, Card, CardContent, CardActionArea } from '@mui/material';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom display="flex" justifyContent="center" alignItems="center">
        Welcome to School Materials
      </Typography>
      <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">
        Browse through the materials for different subjects. Select a subject to get started.
      </Typography>

      <Grid container spacing={3} display="flex" marginTop={2}>
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} href="/">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Card 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Beschrijving voor card 111
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} href="/materials/math">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Card 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Beschrijving voor card 1
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea component={Link} href="/pagina1">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Card 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Beschrijving voor card 1
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
