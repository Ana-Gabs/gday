// ./pages/Calendario.js
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ActicvidadesUsuario from '../components/containers/ActividadesUsuario';


const Acticvidades = () => {
  return (
    <div style={{ backgroundColor: '#F4F6FA', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <ActicvidadesUsuario/>
      <Footer />
    </div> 
  );
};

export default Acticvidades;