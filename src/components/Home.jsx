import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Container from '@mui/material/Container';

import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';

import FormGroup from "@mui/material/FormGroup";
import InputAdornment from "@mui/material/InputAdornment";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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

  const [cadenaOrigin, setCadenaOrigen] = useState(null);
  const [claveTramite, setClaveTramite] = useState(null);
  const [satpass, setSATPass] = useState(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [error, setError] = useState('');
  //const [navigate, setNavigate] = useState(false);

  const URL = "https://tableroelectronico-qa.michoacan.gob.mx/api/firmarPDF";
  const navigate = useNavigate();

  const defaultTheme = createTheme();

  const handleUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('pdf[]', file);
    formData.append('cer', file);
    formData.append('key', file);
    formData.append('pass', satpass);
    formData.append('cadenaOrigen', cadenaOrigin);
    formData.append('clave_tramite', claveTramite);
    formData.append('email', 1);
    formData.append('encabezado', 1);


    try {
      const response = await axios.post(URL, formData,{
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
    
      //navigate('/home');
    } catch (err) {
      setError(response.data);
    }
  };



    const [file, setFile] = React.useState(null)
  
    const handleFile = (newFile) => {
      setFile(newFile)
    }


  return (
  <div>
    <Header />
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
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
        <Box component="form" onSubmit={handleUpload} noValidate sx={{ mt: 1}}>
         

    <MuiFileInput  
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <UploadFileIcon />
        </InputAdornment>
  )}}
      placeholder='Añadir archivo'
      inputProps={{ accept: '.pdf' }} 
      value={file}
      onChange={handleFile}
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
            value={cadenaOrigin}
            onChange={(e) => setCadenaOrigen(e.target.value)}
          />

         

<TextField
            margin="normal"
            required
            fullWidth
            id="claveTramite"
            label="Clave tramite"
            name="cadenaOrigen"
            value={claveTramite}
            onChange={(e) => setClaveTramite(e.target.value)}
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
            value={satpass}
            onChange={(e) => setSATpass(e.target.value)}
          />
      

      <FormGroup>
  <FormControlLabel control={<Switch />} label="Encabezado de pagina"  />
  <FormControlLabel control={<Switch />} label="Correo Institucional" />

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
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar
          </Button>
         
        </Box>
      </Box>
      
    </Container>
  </ThemeProvider>
  </div>
  );
}