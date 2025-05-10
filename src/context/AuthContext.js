import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Función para obtener el perfil del usuario autenticado
  const fetchUserProfile = async (token) => {
    try {
      const response = await api.get('/usuarios/perfil/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log('Perfil obtenido:', response.data);
    } catch (error) {
      console.error('Error al obtener el perfil:', error.response?.data || error.message);
      throw new Error('No se pudo obtener el perfil de usuario');
    }
  };

  // Función de Login
  const loginUser = async (username, password) => {
    try {
      const response = await api.post('/usuarios/login/', { username, password });
      const { access, refresh } = response.data;

      // Guardar tokens en AsyncStorage
      await AsyncStorage.setItem('accessToken', access);
      await AsyncStorage.setItem('refreshToken', refresh);

      setAccessToken(access);
      console.log('Tokens guardados:', { access, refresh });

      // Obtener el perfil del usuario autenticado
      await fetchUserProfile(access);

      return { access, refresh };
    } catch (error) {
      console.error('Error en el login:', error.response?.data || error.message);
      throw new Error(error.response?.data?.detail || 'Credenciales incorrectas');
    }
  };

  // Cerrar Sesión
  const logoutUser = async () => {
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    console.log('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
