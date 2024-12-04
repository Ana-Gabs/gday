// ./pages/Resportes.js
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Registrando componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Resportes = () => {
  // Datos para la gráfica de pastel
  const dataDoughnut = {
    labels: ['Ventas', 'Suscripciones', 'Consultas'],
    datasets: [
      {
        label: 'Porcentaje',
        data: [55, 25, 20],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  // Datos para la gráfica de barras
  const dataBar = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ingresos ($)',
        data: [1200, 1900, 800, 1500, 2300, 1800],
        backgroundColor: '#36A2EB',
        borderColor: '#007BFF',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ backgroundColor: '#D6EAF8', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#2E86C1', marginBottom: '20px' }}>Reportes</h1>

        {/* Contenedor para gráficos */}
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {/* Gráfica de pastel */}
          <div style={{ width: '250px', height: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#2E86C1' }}>Actividades</h3>
            <Doughnut data={dataDoughnut} />
          </div>

          {/* Gráfica de barras */}
          <div style={{ width: '400px', height: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#2E86C1' }}>Actividades Realizadas</h3>
            <Bar data={dataBar} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resportes;
