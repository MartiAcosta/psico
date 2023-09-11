import { Avatar, Button, Stack } from '@mui/material';
import '../App.css';
import ArticleIcon from '@mui/icons-material/Article';
import PaidIcon from '@mui/icons-material/Paid';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from 'react-router-dom';


function Menu() {
    const navigate = useNavigate(); 

    const handlePatientClick = () => {
        navigate('/pacientes'); 
    };
    
    const handleSocialWorkClick = () => {
        navigate('/obraSocial')
    }

    const handleBillingProcessedClick = () => {
        navigate('/facturasProcesadas')
    }

    const handlePayClick = () => {
        navigate('/pagos')
    }
return (
<div className="App">
    <header className="App-header">
    <div className='Navbar'>
        <p></p>
    </div>
    <div className='App-avatar' style={{width: '340px', height: '159px'}}>
        <div className='avatar'>
            <Avatar alt="Remy Sharp" />
            <div className="avatar-info">
                <p className="avatar-info-porf">Profesion</p>
                <p className="avatar-info-lastname">Nombre Apellido</p>
            </div>
        </div>
    </div>
    <div className='App-avatar' style={{width: '340px', height: '159px'}}>
        <Stack sx={{display: 'grid', marginTop: '21px', justifyContent: 'space-around' }}>
            <Button onClick={handleBillingProcessedClick} startIcon={<ArticleIcon />} sx={{backgroundColor: '#2F3E44', Width: '2px', color: '#C7D8D9', border: '2px solid #C7D8D9', m: 1, width: '30ch', borderRadius:' 20px'}}>Factura</Button>
            <Button onClick={handlePayClick} startIcon={<PaidIcon />} sx={{backgroundColor: '#C7D8D9', strokeWidth: '2px', color: '#2F3E44', border: '2px solid #2F3E44', m: 1, width: '30ch', borderRadius:' 20px'}}>Pago</Button>
        </Stack>
    </div>
    <div className='App-avatar' style={{width: '340px', height: '159px'}}>
        <Stack sx={{display: 'grid', marginTop: '21px', justifyContent: 'space-around' }}>
            <Button onClick={handleSocialWorkClick} startIcon={<MedicalServicesIcon/>} sx={{backgroundColor: '#2F3E44', Width: '2px', color: '#C7D8D9', border: '2px solid #C7D8D9', m: 1, width: '30ch', borderRadius:' 20px'}}>Obra Social</Button>
            <Button onClick={handlePatientClick} startIcon={<PermIdentityIcon/>} sx={{backgroundColor: '#C7D8D9', strokeWidth: '2px', color: '#2F3E44', border: '2px solid #2F3E44', m: 1, width: '30ch', borderRadius:' 20px'}}>Paciente</Button>
        </Stack>
    </div>
    <div className='Navbar'>
        <p></p>
    </div>
    </header>
</div>
);
}

export default Menu;