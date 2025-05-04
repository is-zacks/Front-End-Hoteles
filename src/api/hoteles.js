// api/hoteles.js
import api from './client';

export async function obtenerHoteles() {
    try {
      const response = await api.get('/hoteles/');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Error al obtener hoteles');
    }
  }
  

export async function obtenerHotelPorId(id) {
  const res = await api.get(`/hoteles/${id}/`);
  return res.data;
}
