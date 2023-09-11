import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import '../App.css';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



function InfoPatient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState ({
        name_patients: '',
        lastname_patients: '',
        dni: '',
        cuil: '',
        afi: '',
        id_obra_social: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPatientData({
            ...patientData,
            [name]: value
        });
    };

    const isEditing = id !== undefined;

    useEffect(() => {
        const fetchPatient = async () => {
            if (isEditing) {
            try {
                const response = await axios.get(`http://localhost:3002/pacientes/${id}`);
                setPatientData(response.data);
            } catch (error) {
                console.error(error);
                console.error("Error Response:", error.response);
            }
            }
        };
        fetchPatient();
    }, [id, isEditing]);

    const [socialWorks, setSocialWorks] = useState([]);
    useEffect(() => {
        const fetchSocialWorks = async () => {
            try {
                const response = await axios.get('http://localhost:3002/obra_social');
                setSocialWorks(response.data);
            } catch (error) {
                console.error('Error fetching social works:', error);
            }
        };

        fetchSocialWorks();
    }, []);


    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3002/pacientes/${id}`, patientData);
            } else {
                await axios.post('http://localhost:3002/pacientes', patientData);
            }
            navigate('/pacientes');
        } catch (error) {
            console.error(error);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

return (
    <div className="App">
    <header className="App-header">
        <div className='Navbar'>
            <IconButton onClick={handleBackClick} aria-label="Atrás" sx={{color: 'black', marginLeft: '-286px', marginTop: '13px', backgroundColor: 'transparent' }}><WestOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <p style={{color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', margin: '-36px'}}> Nuevo paciente</p>
        </div>
        <div className='App-avatar' style={{width: '340px', height: 'auto'}}>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', backgroundColor: '#FFF', border: '2px solid #F5F3F3'},     display: 'grid',
                justifyContent: 'center', margin: 'auto',
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField
                            name="name_patients"
                            id="outlined-required"
                            label="Nombre"
                            value={patientData.name_patients}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="lastname_patients"
                            id="outlined-required"
                            label="Apellido"
                            value={patientData.lastname_patients}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="dni"
                            id="outlined-required"
                            label="Dni"
                            value={patientData.dni}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="cuil"
                            id="outlined-required"
                            label="Cuil"
                            value={patientData.cuil}
                            onChange={handleInputChange}
                        />
                        <FormControl sx={{ m: 1, width: '25ch',  backgroundColor: '#FFF', border: '2px solid #F5F3F3', justifyContent: 'center', marginTop: '6px'}}>
                            <InputLabel id="demo-simple-select-helper-label">Obra social</InputLabel>
                            {socialWorks.length > 0 && (
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Obra social"
                                    value={patientData.id_obra_social || ''}  
                                    onChange={handleInputChange}
                                    name="id_obra_social" 
                                >
                                    {socialWorks.map(socialWork => (
                                        <MenuItem key={socialWork.id} value={socialWork.id}>
                                            {socialWork.social_work}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </FormControl>
                        <TextField
                            name="afi"
                            id="outlined-required"
                            label="N° de afilado"
                            value={patientData.afi}
                            onChange={handleInputChange}
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

export default InfoPatient;




