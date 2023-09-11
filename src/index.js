import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Menu from '../src/components/menu';
import reportWebVitals from './reportWebVitals';
import FormBilling from '../src/components/formFacturas';
import InfoSocialWork from '../src/components/formObraSocial';
import InfoPatient from '../src/components/formPacientes';
import Patient from '../src/components/pacientes';
import SocialWork from '../src/components/obraSocial';
import Billing from '../src/components/facturasProcesadas';
import Pay from '../src/components/pagos';

const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/formFacturas/:id" element={<FormBilling />} />
        <Route path="/formFacturas" element={<FormBilling />} />
        <Route path="/formObraSocial/:id" element={<InfoSocialWork />} />
        <Route path="/formObraSocial" element={<InfoSocialWork />} />
        <Route path="/formPacientes/:id" element={<InfoPatient />} />
        <Route path="/formPacientes" element={<InfoPatient />} />
        <Route path="/pacientes/:id" element={<Patient />} />
        <Route path="/pacientes" element={<Patient />} />
        <Route path="/obraSocial" element={<SocialWork />} />
        <Route path="/facturasProcesadas" element={<Billing />} />
        <Route path="/pagos/:id" element={<Pay />} />
        <Route path="/pagos" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();