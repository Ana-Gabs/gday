import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CalendarioUsuario from '../components/containers/CalendarioUsuario';
import Swal from 'sweetalert2';


const Calendario = () => {
  const navigate = useNavigate();


  useEffect(() => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn !== 'true') {
    Swal.fire({
      icon: 'info',
      title: 'Inicio de sesión requerido',
      text: 'Por favor, inicia sesión para acceder a esta página.',
    }).then(() => {
      navigate('/inicio-sesion');
    });
  }
}, [navigate]);
  return (
    <div style={{ backgroundColor: '#F4F6FA', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <CalendarioUsuario/>
      <Footer />
    </div>
  );
};

export default Calendario;
