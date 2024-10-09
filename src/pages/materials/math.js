import { Typography, List, ListItem, ListItemText, Container } from '@mui/material';
import Layout from '../../components/Layout';

export default function MathMaterials() {
  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Math Materials
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Algebra Basics" secondary="Introduction to Algebra" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Geometry" secondary="Understanding shapes and angles" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Calculus" secondary="Derivatives and Integrals" />
          </ListItem>
        </List>
      </Container>
    </>
  );
}
