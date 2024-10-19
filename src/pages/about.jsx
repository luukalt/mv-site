// pages/about.jsx

import React from 'react';
import { Container, Typography, Box} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" sx={{ my: 4, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <img
          src="/Foto Marieke 2.jpg" // Replace with your image path
          alt="About Me"
          style={{ width: isMobile ? '100%' : '75%', height: 'auto', borderRadius: isMobile ? '25px' : '50px' }}
        />
      </Box>
      <Typography variant="h3" gutterBottom>
        Over Mij
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 'bold' }}>
        ‘Als leerkracht kun je elke dag verhalen schrijven.’
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Dat zei mijn vader toen ik hem vertelde dat ik na de Middelbare school naar de Schrijversvakschool wilde. Hij voegde er aan toe dat een baan in het onderwijs mij meer zekerheid zou bieden.
        Na lang wikken en wegen volgde ik zijn advies op. Ik ging naar de Pedagogische academie en werd juf. 

        Al snel merkte ik dat mijn vader gelijk had. In de klas ontdekte ik hoe ik mijn creativiteit kon inzetten. De verhalen die ik schreef, las ik voor aan mijn leerlingen, en ik maakte toneelstukken die we samen opvoerden met alle meesters en juffen. Elke les bood me de kans om iets nieuws te ontwikkelen dat niet alleen aansloot bij de leerdoelen, maar ook bij mijn passie voor boeken.
      </Typography>

      <Typography variant="body1" sx={{ mb: 0, fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 'bold' }}>
        Droom
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Toen mijn vader een aantal jaren geleden overleed, besloot ik dat ik nog meer met mijn droom wilde doen. Ik volgde de opleiding ‘Kinderboeken Schrijven’ aan de Schrijversacademie. Tot mijn verrassing werd een verhaal dat ik schreef gepubliceerd in Schrijven magazine en ik won zelfs een schrijfwedstrijd. Momenteel ben ik bezig met het schrijven van een kinderboek.
      </Typography> 

      <Typography variant="body1" sx={{ mb: 0, fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 'bold' }}>
        Les-ideeën
      </Typography> 
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Op deze site vind je lesideeën om in de klas aan de slag te gaan met boeken en activiteiten die ik speciaal heb ontworpen voor leesbevordering. Mijn doel is simpel: zoveel mogelijk kinderen laten ervaren hoe leuk lezen is.

        Naast lesgeven en schrijven ontwerp ik ook lesideeën voor het lidmaatschap van{' '}
        <Typography component="a" href="https://www.boekwijzer.com" target="_blank" rel="noopener noreferrer" sx={{color: theme.palette.primary.main}} >
          Boekwijzer
        </Typography>
        , volg ik een studie Jeugdliteratuur aan de hogeschool in Leiden, lees ik regelmatig voor in de bibliotheek, ben ik leescoördinator op de school waar ik werk, en doe ik leuke dingen met mijn drie kinderen.
      </Typography>

      <Typography variant="body1" sx={{ mb: 0, fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 'bold' }}>
        Druk?
      </Typography>  

      <Typography variant="body1" sx={{ mb: 2 }}>
        Sommige mensen vragen me wel eens of ik het niet te druk heb. Het antwoord is simpel: ‘Nee, helemaal niet!’
        Ik sta gewoon om vijf uur op. Dan heb ik ineens twee uur extra om mijn dag te beginnen. Misschien zoek ik er nog wel een hobby bij.
      </Typography> 
        
      

      
      
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Neem ook eens een kijkje op mijn Instagram account.
      </Typography>
      <a href="https://www.instagram.com/mariekeversleijen" target="_blank" rel="noopener noreferrer">
        <InstagramIcon sx={{ fontSize: 60, color: '#E4405F', display: 'block', margin: '0 auto' }} />
      </a>
    </Container>
  );
};

export default AboutPage;
