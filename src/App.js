
import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import './App.css'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate  } from 'react-router-dom';

function App() {
  const navigate = useNavigate(); 

  const handleIngresarClick = () => {
    navigate('/menu'); 
  };


  
  return (
      <div className="App">
        <header className="App-header">
          <div className='App-avatar'>
            <div className='avatar'>
            </div>
          </div>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch', backgroundColor: '#FFF', border: '2px solid #F5F3F3', display: 'grid' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-required"
                label="Correo Electronico"
              />
              <TextField
                id="outlined-password-input"
                label="Contraseña"
                type="Contraseña"
                autoComplete="current-password"
              />
            </div>
            <div>
              <FormControlLabel control={<Checkbox />} label="Recordar contraseña" />
              <p style={{color: '#FFF', fontSize: '1.1rem', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>¿Olvidaste tu contraseña?</p>
            </div>
            <Stack sx={{display: 'grid'}}>
              <Button sx={{backgroundColor: '#FFF', Width: '2px', color: '#2F3E44', border: '2px solid #2F3E44', m: 1, width: '40ch'}}>REGISTRARSE</Button>
              <Button onClick={handleIngresarClick} sx={{backgroundColor: '#2F3E44', strokeWidth: '2px', color: '#FFF', border: '2px solid #E7E7E7', m: 1, width: '40ch'}}>INGRESAR</Button>
            </Stack>
          </Box>
        </header>
      </div>
  );
}

export default App;
