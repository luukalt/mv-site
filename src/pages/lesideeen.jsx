import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const ContentPage = () => {
  const [contentItems, setContentItems] = useState([]);

  // const fetchContentItems = async () => {
  //   try {
  //     const q = query(collection(db, "contents", "lesideeen", "files"), orderBy("order"));
  //     const querySnapshot = await getDocs(q);
  //     const items = querySnapshot.docs.map(doc => doc.data());
  //     setContentItems(items);
  //   } catch (error) {
  //     console.error('Error fetching content from Firestore:', error);
  //   }
  // };

  const fetchContentItems = async () => {
    try {
      const q = query(collection(db, "contents", "lesideeen", "files"), orderBy("order"));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => doc.data());
      setContentItems(items);
    } catch (error) {
      console.error('Error fetching content from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchContentItems();
  }, []);

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
            Geen materiaal beschikbaar.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ContentPage;


// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Box, Typography } from '@mui/material';
// import { db } from '../../firebase';
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// const HOSTING_BASE_URL = 'https://marieke-versleijen.web.app';
// const FIREBASE_STORAGE_BASE_URL = 'https://firebasestorage.googleapis.com/v0/b/marieke-versleijen.appspot.com/o';

// const ContentPage = () => {
//   const [contentItems, setContentItems] = useState([]);

//   const fetchContentItems = async () => {
//     try {
//       const q = query(collection(db, "contents", "lesideeen", "files"), orderBy("order"));
//       const querySnapshot = await getDocs(q);
      
//       const items = querySnapshot.docs.map(doc => {
//         const data = doc.data();

//         // Check if the URLs exist before trying to replace them
//         const newPdfUrl = data.pdfUrl 
//           ? data.pdfUrl.replace(FIREBASE_STORAGE_BASE_URL, HOSTING_BASE_URL).split('?')[0]
//           : '';
//         const newImageUrl = data.imageUrl 
//           ? data.imageUrl.replace(FIREBASE_STORAGE_BASE_URL, HOSTING_BASE_URL).split('?')[0]
//           : '';
        
//         return { 
//           ...data, 
//           pdfUrl: newPdfUrl, 
//           imageUrl: newImageUrl 
//         };
//       });
        
//       setContentItems(items);
//     } catch (error) {
//       console.error('Error fetching content from Firestore:', error);
//     }
//   };

//   useEffect(() => {
//     fetchContentItems();
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ my: 2, textAlign: 'center' }}>
//       <Typography variant="h3" gutterBottom align="center" sx={{ fontSize: '2.5rem' }}>
//         Lesideeën
//       </Typography>

//       <Typography variant="body1" sx={{ mb: 2, fontSize: '1.5rem' }}>
//         Klik op de afbeelding voor de uitleg en het materiaal.
//       </Typography>

//       <Grid container spacing={2}>
//         {contentItems.length > 0 ? (
//           contentItems.map((item, index) => (
//             <Grid item xs={12} sm={6} md={4} key={item.name}>
//               <Box
//                 sx={{
//                   position: 'relative',
//                   textAlign: 'center',
//                   transition: 'transform 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
//                     borderRadius: '20px',
//                     border: '2px solid #000',
//                   },
//                 }}
//               >
//                 {index === 0 && (
//                   <img
//                     src="/nieuw.png"
//                     alt="Nieuw"
//                     style={{
//                       position: 'absolute',
//                       bottom: '60px',
//                       right: '10px',
//                       width: '150px',
//                       height: 'auto',
//                       borderRadius: 10,
//                     }}
//                   />
//                 )}
//                 <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     style={{
//                       width: '100%',
//                       height: '400px',
//                       objectFit: 'fill',
//                       borderRadius: '19px',
//                     }}
//                   />
//                 </a>
//                 <Typography variant="h5" sx={{ mt: 1 }}>
//                   {item.name}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
//             Geen materiaal beschikbaar.
//           </Typography>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default ContentPage;