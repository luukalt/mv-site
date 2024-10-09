import { Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Welcome to School Materials
      </Typography>
      <Typography variant="body1" paragraph>
        Browse through the materials for different subjects. Select a subject to get started.
      </Typography>

      {/* Grid layout for subject cards */}
      <Grid container spacing={4}>
        {/* Math Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/materials/math" passHref>
            <CardActionArea>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Math
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Algebra, Geometry, Calculus, and more.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Link>
        </Grid>

        {/* Science Card */}
        <Grid item xs={12} sm={6} md={4}>
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
        </Grid>

        {/* History Card */}
        <Grid item xs={12} sm={6} md={4}>
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
        </Grid>
      </Grid>
    </>
  );
}
