import Footer from '../components/Footer';
import Header from '../components/Header';
import InformacionUsuario from '../components/containers/InformacionUsuario';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {WEBSERVICE_IP} from '../functions/roots/webserviceIP'

const usuarioMock = {
  nombre: 'Andrea',
  apellidoPaterno: 'Pérez',
  apellidoMaterno: 'González',
  email: 'juan.perez@correo.com',
  contrasena: 'miContraseñaSegura123',
  imagenPerfil: '',
};

const Perfil = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null); // Nuevo estado para detalles de suscripción
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioId = sessionStorage.getItem('usuarioId');
    if (usuarioId) {
      axios
        .get(`${WEBSERVICE_IP}/subscripciones/suscripcion/${usuarioId}`)
        .then((response) => {
          const { suscrito, fechaInicio, fechaFin, tipoSuscripcion, costo, nombre } = response.data;
          setIsSubscribed(suscrito);
          if (suscrito) {
            // Guardar los detalles de la suscripción
            setSubscriptionDetails({
              fechaInicio,
              fechaFin,
              tipoSuscripcion,
              costo,
              nombre,
            });
          }
        })
        .catch(() => setIsSubscribed(false));
    }
  }, []);

  const handleSubscriptionRedirect = () => {
    navigate('/suscripcion');
  };

  return (
    <div style={{ backgroundColor: '#F4F6FA', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, padding: '20px', gap: '20px' }}>
        {/* Sección del formulario de perfil */}
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h2>Editar Perfil</h2>
          <InformacionUsuario usuario={usuarioMock} />
        </div>

        {!isSubscribed && (
          <div
            style={{
              flex: 0.5,
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2>Accede a los Reportes</h2>
            <p style={{ textAlign: 'center', margin: '20px 0' }}>
              ¡Suscríbete ahora para desbloquear el acceso a nuestros reportes exclusivos!
            </p>
            <button
              onClick={handleSubscriptionRedirect}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Suscribir
            </button>
          </div>
        )}

        {/* Mostrar información de suscripción si está suscrito */}
        {isSubscribed && subscriptionDetails && (
          <div
            style={{
              flex: 0.5,
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <h2>Suscripción Activa</h2>
            <p><strong>Usuario:</strong> {subscriptionDetails.nombre}</p>
            <p><strong>Tipo de Suscripción:</strong> {subscriptionDetails.tipoSuscripcion}</p>
            <p><strong>Costo:</strong> ${subscriptionDetails.costo}</p>
            <p><strong>Fecha de Inicio:</strong> {new Date(subscriptionDetails.fechaInicio).toLocaleDateString()}</p>
            <p><strong>Fecha de Fin:</strong> {new Date(subscriptionDetails.fechaFin).toLocaleDateString()}</p>
            <p>¡Estás suscrito a los reportes exclusivos!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
