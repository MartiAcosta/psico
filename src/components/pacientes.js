import {  Button, IconButton, Stack } from '@mui/material';
import '../App.css';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


function Patient() {
    const navigate = useNavigate(); 

    const handleFormInfoPatientClick = () => {
        navigate('/formPacientes'); 
    };

    const handleBackClick = () => {
        navigate(-1);
    }
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const getPacientes = async () => {
            try {
                const response = await axios.get('http://localhost:3002/pacientes');
                setPacientes(response.data);
            } catch (error) {
                console.log('Error al obtener pacientes', error);
            }
        };
        getPacientes();
    }, []);

    const handleEditClick = (pacienteId) => {
        navigate(`/formPacientes/${pacienteId}`);
    };

    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = (id) => {
        setShowInfo((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleDelete = async (pacienteId) => {
        try {
            await axios.delete(`http://localhost:3002/pacientes/${pacienteId}`);
            setPacientes(pacientes.filter(p => p.id !== pacienteId));
            navigate('/pacientes'); 
        } catch (error) {
            console.log("Hubo un error al eliminar el paciente:", error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className='Navbar'>
                    <IconButton onClick={handleBackClick} aria-label="Atrás" sx={{color: 'black', marginLeft: '-286px', marginTop: '13px', backgroundColor: 'transparent' }}><WestOutlinedIcon sx={{ color: 'black' }} /></IconButton>
                    <p style={{color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', margin: '-36px'}}> Pacientes</p>
                </div>
                <div className='App-avatar' style={{width: '340px', height: 'auto'}}>
                    <div style={{ width: '300px', height: 'auto', margin: '14px 0px 3px 14px' }}>
                        {pacientes.map((paciente) => (
                            <React.Fragment key={paciente.id}>
                                <Accordion  
                                expanded={showInfo[paciente.id]}
                                onChange={() => toggleInfo(paciente.id)}
                                style={{ margin: '8px 0' }}
                                >
                                    <AccordionSummary style={{backgroundColor: '#f5f3f3'}}
                                    expandIcon={<div style={{
                                        backgroundColor: '#2F3E44',
                                        color: '#C7D8D9',
                                        width: '30px', 
                                        height: '35px', 
                                        borderRadius: '50%', 
                                        }}><ExpandMoreIcon /></div>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                        <Typography 
                                        sx={{
                                            color: '#000',
                                            fontFeatureSettings: "'clig' off, 'liga' off",
                                            fontFamily: 'Inter',
                                            fontSize: '20px',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.333px',
                                            textAlign: 'left'
                                        }}>
                                            {paciente.name_patients} {paciente.lastname_patients}</Typography>
                                    </AccordionSummary>
                                    {showInfo[paciente.id] && (
                                        <AccordionDetails style={{backgroundColor: '#f5f3f3'}}>
                                            <Typography 
                                            sx={{
                                                color: 'rgba(0, 0, 0, 0.79)',
                                                fontFeatureSettings: "'clig' off, 'liga' off",
                                                fontFamily: 'Inter',
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                fontWeight: '400',
                                                lineHeight: 'normal',
                                                letterSpacing: '-0.333px',
                                                textAlign: 'left',
                                                marginBottom: '8px'
                                            }}>
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Apellido:</strong> {paciente.lastname_patients}<br />
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>DNI:</strong> {paciente.dni}<br />
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Nº de afiliado:</strong> {paciente.afi}
                                            </Typography>
                                            <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '80px', marginLeft: '95px' }}>
                                                <div style={{
                                                backgroundColor: '#2F3E44',
                                                color: '#C7D8D9',
                                                width: '30px', 
                                                height: '35px', 
                                                borderRadius: '50%', 
                                                }}>
                                                    <EditIcon style={{fontSize: '1.2rem'}} onClick={() => handleEditClick(paciente.id)}/>
                                                </div>
                                                <div style={{
                                                backgroundColor: '#2F3E44',
                                                color: '#C7D8D9',
                                                width: '30px', 
                                                height: '35px', 
                                                borderRadius: '50%', 
                                                }}>
                                                    <DeleteIcon onClick={() => handleDelete(paciente.id)} style={{fontSize: '1.2rem'}}/>
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    )}
                                </Accordion>
                            </React.Fragment>
                        ))}    
                    </div>
                <Stack sx={{display: 'grid'}}>
                    <Button 
                    onClick={handleFormInfoPatientClick}
                    sx={{
                    backgroundColor: '#2F3E44',
                    color: '#C7D8D9',
                    width: '50px', 
                    height: '35px', 
                    borderRadius: '50%', 
                    marginTop: '38px',
                    marginBottom: '16px',
                    marginLeft: '250px;',
                    }}>
                        <AddIcon/>
                    </Button>
                </Stack>
                </div>
                <div className='Navbar'>
                    <p></p>
                </div>
            </header>
        </div>
    );
}

export default Patient;




