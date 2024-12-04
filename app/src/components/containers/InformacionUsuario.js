import React, { useState, useEffect } from 'react';
import { WEBSERVICE_IP } from '../../functions/roots/webserviceIP';
import { Avatar, IconButton, TextField, Grid, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import { AgregarButtonWithIcon } from '../../functions/BotonesF';  // Asegúrate de importar el componente correctamente

const InformacionUsuario = () => {
  const defaultAvatar = '/images/avatars/user_default.png';
  const [usuario, setUsuario] = useState(null);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [nombre, setNombre] = useState('');
  const [app, setApp] = useState('');
  const [apm, setApm] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Obtener `id_us` directamente de `sessionStorage`
  const [usuarioId] = useState(sessionStorage.getItem('usuarioId'));

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!usuarioId) {
        console.error('No se encontró el ID de usuario en sessionStorage');
        return;
      }

      try {
        const response = await fetch(`${WEBSERVICE_IP}/usuarios/usuario/${usuarioId}`);
        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
          setNombre(data.nombre);
          setApp(data.app);
          setApm(data.apm);
          setCorreo(data.correo);
          setContrasena(data.contrasena);
          console.log("Datos del usuario obtenidos: ", data);
        } else {
          console.error('Error al obtener datos del usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  const handleChangePhoto = () => {
    alert('Función para cambiar foto de perfil');
  };

  const handleSave = async () => {
    const updatedUsuario = {
      nombre,
      app,
      apm,
      correo,
      contrasena
  };

    try {
      const response = await fetch(`${WEBSERVICE_IP}/usuario/actualizar/${usuarioId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUsuario),
    });

      if (response.ok) {
        alert('Datos actualizados correctamente');
        const updatedData = await response.json();
        setUsuario(updatedData);
      } else {
        alert('Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Hubo un problema al guardar los datos');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '20px auto',
        maxWidth: '800px',
        width: '90%',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} style={{ textAlign: 'center', position: 'relative' }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Avatar
              alt="Perfil del usuario"
              src={usuario?.imagenPerfil || defaultAvatar}
              sx={{ width: 100, height: 100 }}
            />
            <IconButton
              onClick={handleChangePhoto}
              style={{
                marginLeft: '-15px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '50%',
              }}
            >
              <CameraAltIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}  // Actualiza el estado
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Apellido Paterno"
            value={app}
            onChange={(e) => setApp(e.target.value)}  // Actualiza el estado
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Apellido Materno"
            value={apm}
            onChange={(e) => setApm(e.target.value)}  // Actualiza el estado
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}  // Actualiza el estado
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Contraseña"
            type={mostrarContrasena ? 'text' : 'password'}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}  // Actualiza el estado
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  edge="end"
                >
                  {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Box display="flex" justifyContent="flex-end">
            <AgregarButtonWithIcon
              onClick={handleSave}
              icon={<SaveIcon />}
              isCircular={false}
            >
              Guardar
            </AgregarButtonWithIcon>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformacionUsuario;
