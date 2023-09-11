import {  Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Stack, Typography } from '@mui/material';
import '../App.css';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function SocialWork() {
    const navigate = useNavigate(); 

    const handleFormInfoSocialWorkClick = () => {
        navigate('/formObraSocial'); 
    };
    
    const handleBackClick = () => {
        navigate(-1);
    }
    const [socialwork, setSocialwork] = useState([]);

    useEffect(() => {
        const getSocialwork =async () => {
            try {
                const response = await axios.get('http://localhost:3002/obra_social');
                setSocialwork(response.data);
            } catch (error) {
                console.log('Error al obtener obra social')
            }
        };
        getSocialwork();
    }, []);

    const handleEditClick = (socialworkId) => {
        navigate(`/formObraSocial/${socialworkId}`);
    };

    const [ showSocialwork, setShowSocialwork] = useState({});

    const toggleSocialwork = (id) => {
        setShowSocialwork((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleDelete = async (socialworkId) => {
        try {
            await axios.delete(`http://localhost:3002/obra_social/${socialworkId}`);
            setSocialwork(prevSocialworks => prevSocialworks.filter(p => p.id !== socialworkId));
            navigate('/obraSocial');
        } catch (error) {
            console.log('Hubo un error al eliminar obra social')
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className='Navbar'>
                    <IconButton onClick={handleBackClick} aria-label="Atrás" sx={{color: 'black', marginLeft: '-286px', marginTop: '13px', backgroundColor: 'transparent' }}><WestOutlinedIcon sx={{ color: 'black' }} /></IconButton>
                    <p style={{color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', margin: '-36px'}}> Obra Social</p>
                </div>
                <div className='App-avatar' style={{width: '340px', height: 'auto'}}>
                    <div style={{ width: '300px', height: 'auto', margin: '14px 0px 3px 14px' }}>
                        {socialwork.map((socialwork) => (
                            <React.Fragment key={socialwork.id}>
                                <Accordion  
                                expanded={showSocialwork[socialwork.id]}
                                onChange={() => toggleSocialwork(socialwork.id)}
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
                                            {socialwork.denomination} </Typography>
                                    </AccordionSummary>
                                    {showSocialwork[socialwork.id] && (
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
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Cuil:</strong> {socialwork.cuil}<br /> 
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Denominación:</strong> {socialwork.denomination} <br />
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Sigla:</strong> {socialwork.social_work} <br/> 
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Domicilio:</strong> {socialwork.address} <br/>
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Localidad:</strong> {socialwork.location} <br/>
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Provincia:</strong> {socialwork.province} <br/>
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Codigo postal:</strong> {socialwork.postal_code} <br/>
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Telefono:</strong> {socialwork.phone} <br/>
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Correo:</strong> {socialwork.email} <br/>
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Web:</strong> {socialwork.web} <br/>
                                                <strong style={{color: 'rgb(0 0 0 / 73%)', display: 'inline-block', marginBottom: '8px'}}>Otro:</strong> {socialwork.otro} <br/>
                                            </Typography>
                                            <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '80px', marginLeft: '95px' }}>
                                                <div style={{
                                                backgroundColor: '#2F3E44',
                                                color: '#C7D8D9',
                                                width: '30px', 
                                                height: '35px', 
                                                borderRadius: '50%', 
                                                }}>
                                                    <EditIcon style={{fontSize: '1.2rem'}} onClick={() => handleEditClick(socialwork.id)}/>
                                                </div>
                                                <div style={{
                                                backgroundColor: '#2F3E44',
                                                color: '#C7D8D9',
                                                width: '30px', 
                                                height: '35px', 
                                                borderRadius: '50%', 
                                                }}>
                                                    <DeleteIcon onClick={() => handleDelete(socialwork.id)} style={{fontSize: '1.2rem'}}/>
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
                        onClick={handleFormInfoSocialWorkClick}
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

export default SocialWork;