import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            School Materials
          </Typography>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button color="inherit">About</Button>
          </Link>
          <Link href="/materials" passHref>
            <Button color="inherit">Materials</Button>
          </Link>
          <Link href="/materials2" passHref>
            <Button color="inherit">Materials2</Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
