import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import '../App.css';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function FormBilling() {
    const { id } = useParams();
    const [billingData, setBillingData] = useState({
        fecha: '',
        numero_factura: '',
        monto: '',
        id_paciente: '',
        id_obra_social: '',
    })
    const handleInput = (event) =>{
        const {name, value} = event.target;
        setBillingData({
            ...billingData,
            [name]: value
        })
    }
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    } 

    const editingIs = id !== undefined;

    useEffect(() => {
        const fetchBilling = async () => {
            if (editingIs) {
                try {
                    const response = await axios.get(`http://localhost:3002/facturas/${id}`);
                    setBillingData(response.data);
                }   catch (error) {
                    console.log(error);
                    console.log("Error Response:", error.response)
                }
            }
        };
        fetchBilling();
    }, [id, editingIs]);

    const [socialWorks, setSocialWorks] = useState([]);
    useEffect(() => {
        const fetchSocialWorks = async () => {
            try{
                const response = await axios.get(`http://localhost:3002/obra_social`);
                setSocialWorks(response.data);
            } catch (error){
                console.log('Error fetching social works:', error)
            }
        }
        fetchSocialWorks();
    }, []);

    const [patients, setPatients] = useState([]);
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/pacientes`);
                setPatients(response.data)
            } catch (error) {
                console.log('Error fetching pacientes:', error)
            }
        }
        fetchPatient();
    }, [])

    const handleSubmit = async () => {
        try{
            if(editingIs){
                await axios.put(`http://localhost:3002/facturas/${id}`, billingData)
            } else {
                await axios.post(`http://localhost:3002/facturas`, billingData)
            }
            navigate('/facturasProcesadas')
        } catch (error) {
            console.log(error)
        }
    };

return (
    <div className="App">
    <header className="App-header">
        <div className='Navbar'>
            <IconButton onClick={handleBackClick} aria-label="Atrás" sx={{color: 'black', marginLeft: '-286px', marginTop: '13px', backgroundColor: 'transparent' }}><WestOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <p style={{color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', margin: '-36px'}}> Nueva factura</p>
        </div>
        <div className='App-avatar' style={{width: '340px', height: 'auto'}}>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch', backgroundColor: '#FFF', border: '2px solid #F5F3F3'}, display: 'grid',
                justifyContent: 'center', margin: 'auto',
            }}
            noValidate
            autoComplete="off"
            >
                <div>
                    <TextField
                    id="outlined-required"
                    label="Fecha"
                    name="fecha"
                    value={billingData.fecha}
                    onChange={handleInput}
                    />
                    <FormControl sx={{ m: 1, width: '25ch',  backgroundColor: '#FFF', border: '2px solid #F5F3F3', justifyContent: 'center', marginTop: '6px'}}>
                        <InputLabel id="demo-simple-select-helper-label">Paciente</InputLabel>
                            {patients.length > 0 && (
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Paciente"
                                value={billingData.id_paciente || ''}
                                name= 'id_paciente'
                                onChange={handleInput}
                                >
                                    {patients.map(patient => (
                                        <MenuItem key={patient.id} value={patient.id}>
                                            {patient.name_patients} 
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                    </FormControl>  
                    <FormControl sx={{ m: 1, width: '25ch',  backgroundColor: '#FFF', border: '2px solid #F5F3F3', justifyContent: 'center', marginTop:'1 px'}}>
                        <InputLabel id="demo-simple-select-helper-label">Obra social</InputLabel>
                        {socialWorks.length > 0 && (
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Obra social"
                            name='id_obra_social'
                            value={billingData.id_obra_social || ''}
                            onChange={handleInput}
                            >
                                {socialWorks.map(socialWork => (
                                        <MenuItem key={socialWork.id} value={socialWork.id}>
                                            {socialWork.social_work}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        )}
                    </FormControl>    
                    <TextField
                    id="outlined-required"
                    label="N° de factura"
                    value={billingData.numero_factura}
                    name='numero_factura'
                    onChange={handleInput}
                    />
                    <TextField
                    id="outlined-required"
                    label="Monto"
                    value={billingData.monto}
                    name='monto'
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

export default FormBilling;