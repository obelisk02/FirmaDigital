import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { db } from '../bd/firebase';
import { collection, doc, addDoc, Timestamp  } from 'firebase/firestore';

import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';


import FormGroup from "@mui/material/FormGroup";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info';

import { MuiFileInput } from 'mui-file-input'

export default function Home() {

  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [error, setError] = useState('');
  const [pdf64, setbase64PDF] = useState('');
  //const [navigate, setNavigate] = useState(false);
  const [file, setFile] = React.useState(null)
  const [archivo_cer, setCer] = React.useState(null)
  const [archivo_key, setKey] = React.useState(null)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);

  const handleCheckboxChange1 = (event) => {
    setIsChecked1(event.target.checked);
  };
  const handleCheckboxChange2 = (event) => {
    setIsChecked2(event.target.checked);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const URL = "https://tableroelectronico-qa.michoacan.gob.mx/api/firmarPDF";
  const navigate = useNavigate();

  const defaultTheme = createTheme();


    const [formData, setFormData] = useState({
      cadenaOrigen: '',
      clave_tramite: '',
      pass: ''
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleFileChange = (newFile) => {
      setFile(newFile)
      //handleFileForm()
    };

    const handleFileChange2 = (newFile) => {
      setCer(newFile)
      //handleFileForm()
    };

    const handleFileChange3 = (newFile) => {
      setKey(newFile)
      //handleFileForm()
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
   
      isChecked1 == true ? setIsChecked1(1) : setIsChecked1(0)
      isChecked2 == true ? setIsChecked2(1) : setIsChecked2(0)

      console.log(isChecked1, isChecked2)

      const data = new FormData();
      data.append('pdf[]', file);
      data.append('cadenaOrigen', formData.cadenaOrigen);
      data.append('clave_tramite', formData.clave_tramite);
      data.append('pass', formData.pass);
 
      data.append('key', archivo_key);
      data.append('cer', archivo_cer);
      
    
      data.append('encabezado', isChecked1);
      data.append('email', isChecked2);
      

        // Obtener el token desde localStorage
    const token = localStorage.getItem('token');

      try {
        for (const value of data.values()) {
          console.log(value);
        }
        const response = await axios.post(URL, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);

        if (!response.data.errors){
          let base64PDF = response.data[0].pdfFirmado
          console.log(base64PDF)
          setbase64PDF(base64PDF);
          document.getElementById('base64Info').innerText = base64PDF
          
          
          handleOpen();
          
        }
        else{
          alert(JSON.stringify(response.data.errors))
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }


    };


   // Función para convertir base64 a Blob
        const descargarPDF = (pdf64) => {
          base64toBlob(pdf64);
          handleSaveFirestore();
      }
        
      const base64toBlob = (pdf64) => {
        console.log(pdf64)
        const info = document.getElementById('base64Info').textContent
         // Insert a link that allows the user to download the PDF file
        let link = document.createElement('a');
        link.innerHTML = 'Download PDF file';
        link.download = file.name 
        link.href = 'data:application/octet-stream;base64,' + info;
        //document.body.appendChild(link);
        link.click();
        };
  
      // Ver pdf en pantalla
        /*
        
        console.log(info)
        var obj = document.createElement('object');
        obj.style.width = '100%';
        obj.style.height = '842pt';
        obj.type = 'application/pdf';
        obj.data = 'data:application/pdf;base64,' + info;
        document.body.appendChild(obj);

        */
      

    const handleSaveFirestore = async () => {
      let info = document.getElementById('base64Info').textContent
      let date = new Date();
      try {
        await addDoc(collection(db, 'base64Firestore'), {
          pdf: info,
          name: file.name,
          description: formData.cadenaOrigen,
          createdAt: Timestamp.fromDate(date)
        });
        alert('Document successfully written!');
      } catch (error) {
        console.error('Error writing document: ', error);
        alert('Error writing document');
      }
    };

  return (
  <div>
    <Header />
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
          <PictureAsPdfIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Firma Digital
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
         

    <MuiFileInput  
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <UploadFileIcon />
        </InputAdornment>
  )}}
      placeholder='Añadir archivo PDF'
      inputProps={{ accept: '.pdf' }} 
      value={file}
      onChange={handleFileChange}
      clearIconButtonProps={{
        title: "Remove",
        children: <CloseIcon fontSize="small" />
      }}
    />

<MuiFileInput  sx={{ mt: 1}}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <UploadFileIcon />
        </InputAdornment>
  )}}
      placeholder='Añadir archivo Certificado'
      inputProps={{ accept: '.cer' }} 
      value={archivo_cer}
      onChange={handleFileChange2}
      clearIconButtonProps={{
        title: "Remove",
        children: <CloseIcon fontSize="small" />
      }}
    />

<MuiFileInput  
  sx={{ mt: 1}}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <UploadFileIcon />
        </InputAdornment>
  )}}
      placeholder='Añadir archivo FIEL'
      inputProps={{ accept: '.key' }} 
      value={archivo_key}
      onChange={handleFileChange3}
      clearIconButtonProps={{
        title: "Remove",
        children: <CloseIcon fontSize="small" />
      }}
    />
 
 
 <TextField
            margin="normal"
            required
            fullWidth
            id="cadenaOrigen"
            label="Descripcion general"
            name="cadenaOrigen"
            autoFocus
            //onChange={(e) => setCadenaOrigen(e.target.value)}
            value={formData.cadenaOrigen}
            onChange={handleInputChange}
          />

         

<TextField
            margin="normal"
            required
            fullWidth
            id="claveTramite"
            label="Clave tramite"
            name="clave_tramite"
            //onChange={(e) => setClaveTramite(e.target.value)}
            value={formData.clave_tramite}
            onChange={handleInputChange}
          />
    
          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Contraseña
            SAT por el contribuyente"
            type="text"
            id="SATpass"
            //onChange={(e) => setSATpass(e.target.value)}
            value={formData.pass}
            onChange={handleInputChange}
          />
      

      <FormGroup>
  <FormControlLabel 
  control={<Switch checked={isChecked1}
          onChange={handleCheckboxChange1}
          />} 
          label="Encabezado de pagina"  
          />
  <FormControlLabel 
  control={<Switch checked={isChecked2}
          onChange={handleCheckboxChange2}
          />} label="Correo Institucional" 
          />

</FormGroup>

{/*
          <IconButton color="primary" aria-label="upload file" component="span">
      <UploadFileIcon />
    </IconButton>

    */}

<LinearProgress variant="determinate" value={uploadProgress} />

{error && <p>{error}</p>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Enviar
          </Button>
         
        </Box>
      </Box>
      
    </Container>
  </ThemeProvider>

  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Descargar PDF
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {file && file.name }
      
      <Button
      onClick={descargarPDF}
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Descargar
          </Button>
    </Typography>
  </Box>
</Modal>
<p style={{display: 'none'}} id='base64Info'></p>
  </div>
  );
}