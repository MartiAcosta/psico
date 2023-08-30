import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import '../App.css';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function InfoSocialWork() {
    const { id } = useParams();
    const [socialworkData, setSocialworkData] = useState ({
            cuil: '',
            denomination: '', 
            social_work: '', 
            province: '', 
            location: '', 
            postal_code: '', 
            address: '', 
            phone: '', 
            email: '', 
            web: '', 
            otro: '', 
    })

    const handleInput = (event) => {
        const {name, value} = event.target;
        setSocialworkData({
            ...socialworkData,
            [name]: value
        });
    };

    const editingIs = id !== undefined;

    useEffect(() => {
        const fetchSocialWork = async () => {
            if (editingIs) {
                try {
                    const response = await axios.get(`http://localhost:3002/obra_social/${id}`);
                    setSocialworkData(response.data);
                } catch (error) {
                    console.log(error);
                    console.error("Error Response:", error.response)
                }
            }
        };
        fetchSocialWork();
    }, [id, editingIs]);


    const handleSubmit = async () => {
        try {
            if(editingIs) {
                await axios.put(`http://localhost:3002/obra_social/${id}`, socialworkData)
            } else {
                await axios.post(`http://localhost:3002/obra_social`, socialworkData)
            }
            navigate('/obraSocial')
        } catch (error) {
            console.log(error)
        }
    };
    

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }
return (
    <div className="App">
    <header className="App-header">
        <div className='Navbar'>
            <IconButton onClick={handleBackClick} aria-label="Atrás" sx={{color: 'black', marginLeft: '-286px', marginTop: '13px', backgroundColor: 'transparent' }}><WestOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <p style={{color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', margin: '-36px'}}> Nueva obra social</p>
        </div>
        <div className='App-avatar' style={{width: '340px', height: 'auto'}}>
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
                    label="Cuit/Cuil"
                    name= 'cuil'
                    value={socialworkData.cuil}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Denominación"
                    name = 'denomination'
                    value={socialworkData.denomination}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Sigla"
                    name= 'social_work'
                    value={socialworkData.social_work}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Provincia"
                    name= 'province'
                    value={socialworkData.province}
                    onChange={handleInput}
                    />       
                    <TextField
                    id="outlined-required"
                    label="Localidad"
                    name = 'location'
                    value={socialworkData.location}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Código Postal"
                    name= 'postal_code'
                    value={socialworkData.postal_code}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Domicilio"
                    name= 'address'
                    value={socialworkData.address}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Teléfono"
                    name= 'phone'
                    value={socialworkData.phone}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Correo electrónico"
                    name= 'email'
                    value={socialworkData.email}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Página Web"
                    name= 'web'
                    value={socialworkData.web}
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Otros"
                    name= 'otro'
                    value={socialworkData.otro}
                    onChange={handleInput}
                    />
                </div>
                <Stack sx={{display: 'grid'}}>
                    <Button onClick={handleSubmit} sx={{backgroundColor: '#2F3E44', strokeWidth: '2px', color: '#FFF', border: '2px solid #E7E7E7', width: '20ch', marginTop: '38px', marginBottom: '16px', marginLeft: '163px', borderRadius: '20px'}}>Confirmar</Button>
                </Stack>
            </Box>
        </div>  
        <div className='Navbar'>
            <p></p>
        </div> 
    </header>
    </div>
);
}

export default InfoSocialWork;