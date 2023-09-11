import { Alert, Button, Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import '../App.css';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Billing() {
    const [billing, setBilling] = useState([]);
    const [selectedBills, setSelectedBills] = useState({})
    
    
    useEffect(() => {
        const getBilling = async () => {
            try{
            const response = await axios.get(`http://localhost:3002/facturas`);
            setBilling(response.data)
            } catch (error){
                console.log('Error al obtener facturas:', error)
            }
        }
        getBilling();
    }, []);

    const handleEditClick = (billingId) => {
        navigate(`/formFacturas/${billingId}`)
    };

    const handleCheckChange = (billiId) => {
        setSelectedBills((prevState) => ({
            ...prevState,
            [billiId]: !prevState[billiId],
        }));
    };

    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

    const handleConfirm = async () => {
        const selectedBillIds = Object.keys(selectedBills).filter(billId => selectedBills[billId]);
        try {
            await axios.post(`http://localhost:3002/facturas_pagas`, { billIds: selectedBillIds });
            setAlert({ open: true, message: 'Facturas procesadas correctamente', severity: 'success' });
            // Obtener la lista actualizada de facturas después de confirmarlas como pagadas
            refreshBillingList();
            navigate('/pagos')
        } catch (error) {
            console.log(error)
            setAlert({ open: true, message: 'Hubo un error al confirmar las facturas pagadas', severity: 'error' });
        }
    }
    
    const refreshBillingList = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/facturas`);
            setBilling(response.data);
        } catch (error) {
            console.log('Error al obtener facturas:', error);
        }
    }

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const navigate = useNavigate(); 

    const handleFormBillingClick = () => {
        navigate('/formFacturas'); 
    };

    const handleDelete = async (billingId) => {
        try {
            await axios.delete(`http://localhost:3002/facturas/${billingId}`);
            setBilling(billing.filter(p => p.id !== billingId));
            navigate('/facturasProcesadas');
        } catch (error) {
            console.log('Hubo un error al eliminar factura', error)
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    }
return (
    <div className="App">
    <header className="App-header">
        <div className='Navbar'>
            <IconButton onClick={handleBackClick} aria-label="Atrás" sx={{color: 'black', marginLeft: '-286px', marginTop: '13px', backgroundColor: 'transparent' }}><WestOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <p style={{color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', margin: '-36px'}}> Facturación</p>
        </div>
            <div className='App-avatar' style={{width: '340px', height: 'auto'}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Paciente</TableCell>
                            <TableCell>Obra Social</TableCell>
                            <TableCell>N° Factura</TableCell>
                            <TableCell>Monto</TableCell>
                            <TableCell>Paga</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billing.map((bill) => (
                            <TableRow key={bill.id}>
                                <TableCell>{bill.numero_factura}</TableCell>
                                <TableCell>{bill.nombre} {bill.apellido}</TableCell>
                                <TableCell>{bill.social_work_obra_social}</TableCell>
                                <TableCell>{bill.fecha}</TableCell>
                                <TableCell>{bill.monto}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedBills[bill.id] || false}
                                        onChange={() => handleCheckChange(bill.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditClick(bill.id)}>Editar</Button>
                                    <Button onClick={() => handleDelete(bill.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={handleConfirm}>Confirmar facturas pagadas</Button>
            </TableContainer> 
            {alert.open && (
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ marginBottom: 2 }}>
                    {alert.message}
                </Alert>
            )}       
            <Stack sx={{display: 'grid'}}>
                <Button onClick={handleFormBillingClick} sx={{backgroundColor: '#2F3E44', strokeWidth: '2px', color: '#FFF', border: '2px solid #E7E7E7', width: '20ch', marginTop: '38px', marginBottom: '16px', marginLeft: '163px', borderRadius: '20px'}}>Mas</Button>
            </Stack>
        </div>
        <div className='Navbar'>
            <p></p>
        </div>
    </header>
    </div>
);
}

export default Billing;