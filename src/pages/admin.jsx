import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup, getRedirectResult, storage, ref, uploadBytes, deleteObject, getDownloadURL, getMetadata } from '../../firebase';
import { Button, Container, Typography, Box, Input, Select, MenuItem, TextField } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from '../../firebase'; // Firestore instance
import { doc, setDoc, collection, getDocs, updateDoc, query, orderBy, deleteDoc } from 'firebase/firestore';

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [pdfUpload, setPdfUpload] = useState(null);
  const [pngUpload, setPngUpload] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('leesbevordering');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const allowedEmails = ['luukaltenburg@gmail.com', 'mariekeversleijen@outlook.com'];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const handleRedirectResult = async () => {
        try {
          const result = await getRedirectResult(auth);
          if (result && allowedEmails.includes(result.user.email)) {
            setUser(result.user);
            localStorage.setItem('user', JSON.stringify(result.user));
          } else if (result && !allowedEmails.includes(result.user.email)) {
            await signOut(auth);
            alert('Access denied.');
          }
        } catch (error) {
          console.error("Error handling redirect result:", error);
        }
      };
      handleRedirectResult();
    }
  }, []);

  const signInWithEmailPassword = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (allowedEmails.includes(result.user.email)) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
      } else {
        await signOut(auth);
        alert('Access denied.');
      }
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const fetchFiles = async () => {
    try {
      const q = query(collection(db, "contents", selectedFolder, "files"), orderBy("order"));
      const querySnapshot = await getDocs(q);
      const files = querySnapshot.docs.map(doc => doc.data());
      setFiles(files);
    } catch (error) {
      console.error("Error fetching files from Firestore:", error);
    }
  };

  const uploadFile = async () => {
    if (!pdfUpload || !pngUpload) return;
    const pdfName = pdfUpload.name.split('.').slice(0, -1).join('.');
    const pngName = pngUpload.name.split('.').slice(0, -1).join('.');
  
    if (pdfName !== pngName) {
      alert('The PDF and PNG file names must match.');
      return;
    }
  
    try {
      const pdfRef = ref(storage, `contents/${selectedFolder}/${pdfUpload.name}`);
      const pngRef = ref(storage, `contents/${selectedFolder}/${pngUpload.name}`);
      
      const metadata = {
        cacheControl: 'public, max-age=2592000', // Cache for 30 days
      };
  
      const [pdfSnapshot, pngSnapshot] = await Promise.all([
        uploadBytes(pdfRef, pdfUpload, metadata),
        uploadBytes(pngRef, pngUpload, metadata)
      ]);
  
      // Fetch and log metadata
      const pdfMetadata = await getMetadata(pdfRef);
      const pngMetadata = await getMetadata(pngRef);
      console.log("PDF Cache-Control:", pdfMetadata.cacheControl); // Should output 'public, max-age=2592000'
      console.log("PNG Cache-Control:", pngMetadata.cacheControl);
  
      const [pdfUrl, pngUrl] = await Promise.all([
        getDownloadURL(pdfRef),
        getDownloadURL(pngRef)
      ]);
  
      await setDoc(doc(db, "contents", selectedFolder, "files", pdfName), {
        name: pdfName,
        pdfUrl,
        imageUrl: pngUrl,
        order: files.length
      });
  
      setPdfUpload(null);
      setPngUpload(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  

  const deleteFile = async (fileName) => {
    try {
        // Reference for PNG and PDF files in Firebase Storage
        const pngRef = ref(storage, `contents/${selectedFolder}/${fileName}.png`);
        const pdfRef = ref(storage, `contents/${selectedFolder}/${fileName}.pdf`);

        // Delete PNG and PDF files from Firebase Storage
        await deleteObject(pngRef).catch(() => console.warn(`${fileName}.png not found.`));
        await deleteObject(pdfRef).catch(() => console.warn(`${fileName}.pdf not found.`));

        // Delete document from Firestore
        const docRef = doc(db, "contents", selectedFolder, "files", fileName);
        await deleteDoc(docRef);

        // Refresh the list of files after deletion
        fetchFiles();
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};



  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [movedItem] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, movedItem);
    setFiles(reorderedFiles);
  };

  const saveOrder = async () => {
    try {
      const updatePromises = files.map((file, index) => {
        const docRef = doc(db, "contents", selectedFolder, "files", file.name);
        return updateDoc(docRef, { order: index });
      });
      await Promise.all(updatePromises);
      alert("Volgorde opgeslagen!");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  useEffect(() => {
    if (user) fetchFiles();
  }, [user, selectedFolder]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom sx={{ my: 2, textAlign: 'center' }}>Admin Page</Typography>
      {!user ? (
        <Box sx={{ textAlign: 'center' }}>
          <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2, width: '100%' }} />
          <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2, width: '100%' }} />
          <Button variant="contained" onClick={signInWithEmailPassword} sx={{ mb: 2 }}>Log in</Button>
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ my: 2, textAlign: 'center',  }}>Welcome, {user.email}</Typography>
          <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            
          <Button variant="contained" color="error" onClick={handleSignOut} sx={{ mb: 4 }}>Sign Out</Button>

          <Typography variant="body1" sx={{ mb: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>Materiaal toevoegen (PDF en PNG moeten dezelfde naam hebben)</Typography>
          <Typography variant="body1" sx={{ mb: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>Kies 'Lesideeen'/'Leesbevordering'/'Boekwijzer'</Typography>
          
            <Select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} sx={{ mb: 1,  backgroundColor: '#FF914C', color: 'black',}}>
              <MenuItem value="leesbevordering">Leesbevordering</MenuItem>
              <MenuItem value="lesideeen">Lesideeën</MenuItem>
              <MenuItem value="boekwijzer">Boekwijzer</MenuItem>
              
            </Select>
          </Box>
          <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
            <Typography variant="body1">Upload PDF</Typography>
            <Input type="file" onChange={(e) => setPdfUpload(e.target.files[0])} />
          </Box>

          <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
            <Typography variant="body1">Upload PNG</Typography>
            <Input type="file" onChange={(e) => setPngUpload(e.target.files[0])} placeholder="Upload PNG" />
          </Box>

          <Box sx={{mb:2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>  
            <Button variant="contained" onClick={uploadFile} disabled={!pdfUpload || !pngUpload} sx={{ mt: 2 }}>Upload</Button>
            <Button variant="contained" color="primary" onClick={saveOrder} sx={{ mt: 4 }}>Volgorde Opslaan</Button>
          </Box>

          <Typography variant="body1" sx={{ mb: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>Sleep de items in de juiste volgorde en klik vervolgens op 'Volgorde opslaan'</Typography>
          

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="files">
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ width: '100%', maxWidth: '600px', mx: 'auto' }}>
                {files.map((file, index) => (
                  <Draggable key={file.name} draggableId={file.name} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 2,
                          mb: 1,
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          backgroundColor: 'white',
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <a href={file.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: 'none', color: 'inherit' }}>
                          <Typography variant="body1" sx={{ color: 'black' }}>{file.name}</Typography>
                        </a>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteFile(file.name)}
                        >
                          Verwijder
                        </Button>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
              )}
            </Droppable>
          </DragDropContext>
          
        </>
      )}
    </Container>
  );
};

export default AdminPage;
