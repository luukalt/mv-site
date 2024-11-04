import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup, getRedirectResult, storage, ref, uploadBytes, listAll, getDownloadURL, deleteObject, getMetadata, updateMetadata } from '../../firebase';
import { Button, Container, Typography, Box, Input, Select, MenuItem, TextField } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
    signInWithEmailAndPassword, 
    signOut,  
  } from 'firebase/auth'

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [pdfUpload, setPdfUpload] = useState(null);
  const [pngUpload, setPngUpload] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('leesbevordering');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const allowedEmails = ['luukaltenburg@gmail.com', 'mariekeversleijen@outlook.com']; // List of allowed emails

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

//   const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       if (allowedEmails.includes(result.user.email)) {
//         setUser(result.user);
//         localStorage.setItem('user', JSON.stringify(result.user));
//       } else {
//         await signOut(auth);
//         alert('Access denied.');
//       }
//     } catch (error) {
//       console.error("Error signing in with Google:", error);
//     }
//   };

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
      const listRef = ref(storage, `contents/${selectedFolder}`);
      const res = await listAll(listRef);

      const filePromises = res.items
        .filter((item) => item.name.endsWith('.png'))
        .map(async (item) => {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          return {
            name: item.name.split('.').slice(0, -1).join('.'),
            url,
            order: metadata.customMetadata?.order ? parseInt(metadata.customMetadata.order) : 0,
            ref: item,
          };
        });

      const filesWithOrder = await Promise.all(filePromises);
      const orderedFiles = filesWithOrder.sort((a, b) => a.order - b.order);

      setFiles(orderedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handlePdfChange = (e) => setPdfUpload(e.target.files[0]);
  const handlePngChange = (e) => setPngUpload(e.target.files[0]);

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
        customMetadata: {
          order: files.length.toString(),
        },
      };

      await uploadBytes(pdfRef, pdfUpload, metadata);
      await uploadBytes(pngRef, pngUpload, metadata);

      setPdfUpload(null);
      setPngUpload(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const deleteFile = async (fileName) => {
    try {
      const pngRef = ref(storage, `contents/${selectedFolder}/${fileName}.png`);
      const pdfRef = ref(storage, `contents/${selectedFolder}/${fileName}.pdf`);

      await deleteObject(pngRef).catch(() => console.warn(`${fileName}.png not found.`));
      await deleteObject(pdfRef).catch(() => console.warn(`${fileName}.pdf not found.`));

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
        const fileRef = file.ref;
        const metadata = {
          customMetadata: { order: index.toString() },
        };
        return updateMetadata(fileRef, metadata);
      });

      await Promise.all(updatePromises);
      alert("De volgorde is opgeslagen!");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  useEffect(() => {
    if (user) fetchFiles();
  }, [user, selectedFolder]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom sx={{ my: 2, textAlign: 'center' }}>Admin Pagina</Typography>
      {!user ? (
        <Box sx={{ textAlign: 'center' }}>
            <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, width: '100%' }}
            />
            <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, width: '100%' }}
            />
            <Button variant="contained" onClick={signInWithEmailPassword} sx={{ mb: 2,}}>Log in</Button>
            {/* <Button variant="contained" onClick={signInWithGoogle} sx={{ mb: 2 }}>Log in with Google</Button> */}
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ my: 2, textAlign: 'center' }}>Welkom, {user.email}</Typography>
          
          <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Button variant="contained" color="error" onClick={handleSignOut} sx={{ mb: 4 }}>Sign Out</Button>

            <Select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              sx={{ backgroundColor: '#FF914C', color: 'black', mb: 2 }}
            >
              <MenuItem value="leesbevordering">Leesbevordering</MenuItem>
              <MenuItem value="lesideeen">Lesideeën</MenuItem>
            </Select>
          </Box>
          
          {/* Upload Section */}
          <Box sx={{ padding:1, my: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', borderRadius: '20px', border: '2px solid #000'}}>
            <Typography variant="h5" sx={{ my: 2, textAlign: 'center' }}>Materiaal toevoegen</Typography>
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>Upload PDF</Typography>
              <Input type="file" onChange={handlePdfChange} placeholder="Upload PDF" />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>Upload PNG</Typography>
              <Input type="file" onChange={handlePngChange} placeholder="Upload PNG" />
            </Box>
            <Button
              variant="contained"
              onClick={uploadFile}
              disabled={!pdfUpload || !pngUpload}
              sx={{
                mt: 2,
                width: '150px',
                bgcolor: !pdfUpload || !pngUpload ? 'black' : 'primary.main',
                color: !pdfUpload || !pngUpload ? 'white' : 'black',
                '&:hover': {
                  bgcolor: !pdfUpload || !pngUpload ? 'black' : 'primary.light',
                },
              }}
            >
              Upload
            </Button>  
          </Box>
          
          {/* Save Order Section */}
          <Box sx={{ my: 2, textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={saveOrder} sx={{ mt: 4 }}>Volgorde opslaan</Button>
          </Box>

          {/* Drag and Drop Section */}
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
