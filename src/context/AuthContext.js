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

    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);

    setAccessToken(access);
    await fetchUserProfile(access);
    return { access, refresh };
  } catch (error) {
    console.error('Error en el login:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    throw new Error('Error al iniciar sesión. Inténtalo de nuevo.');
  }
};


  // Función de Registro
  const registerUser = async (username, email, password) => {
    try {
      // Realizar la solicitud de registro al backend
      const response = await api.post('/usuarios/registro/', { username, email, password });
      console.log('Registro exitoso:', response.data);

      // Después del registro, iniciar sesión automáticamente
      await loginUser(username, password);

      return response.data;
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
      throw new Error(error.response?.data?.detail || 'Error al registrar el usuario');
    }
  };

  // Función para actualizar el perfil del usuario
  const updateUserProfile = async (username, email) => {
  try {
    const response = await api.patch('/usuarios/perfil/edit/', {
      username,
      email,
    });

    // Actualizar el estado del usuario en el contexto
    setUser((prev) => ({
      ...prev,
      ...response.data,
    }));
    console.log('Perfil actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el perfil:', error.message);
    throw new Error('No se pudo actualizar el perfil');
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
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser, updateUserProfile, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
