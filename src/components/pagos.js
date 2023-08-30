import {  Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import '../App.css';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Pay() {
    const [pay, setPay] = useState([]);

    useEffect(() => {
        const getPay = async () => {
            try{
                const response = await axios.get('http://localhost:3002/facturas_pagas')
                setPay(response.data)
            } catch (error) {
                console.log('Error al obtener facturas pagas')
            }
        };
        getPay()
    }, []);

    const handleDelete = async (payid) => {
        try {
            await axios.delete(`http://localhost:3002/facturas_pagas/${payid}`)
            setPay(prevPay => prevPay.filter(p => p.id === payid))
            navigate('/pagos')
        } catch (error) {
            console.log('Hubo un error al eliminar la factura')
        }
    }

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    const totalAmount = pay.reduce((acc, curr) => acc + parseFloat(curr.monto_pagado), 0);

return (
    <div className="App">
    <header className="App-header">
        <div className='Navbar'>
            <IconButton onClick={handleBackClick} aria-label="Atrás" sx={{color: 'black', marginLeft: '-286px', marginTop: '13px', backgroundColor: 'transparent' }}><WestOutlinedIcon sx={{ color: 'black' }} /></IconButton>
            <p style={{color: '#000', fontSize: '20px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal', margin: '-36px'}}>Pagos</p>
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
                        </TableRow>
                    </TableHead>
                    {pay.map((pay) => (
                    <TableBody key={pay.id}>
                            <TableRow>
                            <TableCell>{pay.fecha_pago}</TableCell>
                            <TableCell>{pay.nombre} {pay.apellido}</TableCell>
                            <TableCell>{pay.obra_social}</TableCell>
                            <TableCell>{pay.id_factura}</TableCell>
                            <TableCell>{pay.monto_pagado}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(pay.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                    ))}
                    <TableBody>
                            <TableRow>
                                <TableCell>TOTAL</TableCell>
                                <TableCell colSpan={3}></TableCell>
                                <TableCell>{totalAmount.toFixed(2)}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <div className='Navbar'>
            <p></p>
        </div>
    </header>
    </div>
);
}

export default Pay;