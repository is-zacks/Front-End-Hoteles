// src/hooks/useHotelById.js
import { useEffect, useState } from 'react';
import api from '../api/client';

export default function useHotelById(hotelId) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) return;
    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hoteles/${hotelId}/completo`);
        setHotel(response.data);
      } catch (err) {
        setError(err.message || 'Error al obtener hotel');
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [hotelId]);

  return { hotel, loading, error };
}
