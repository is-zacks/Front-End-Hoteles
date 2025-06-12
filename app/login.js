import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from '../components/BaseScreen';
import { useAuth } from '../src/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { loginUser } = useAuth();

  // Toggle para mostrar/ocultar la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(''); // Limpiar mensaje de error previo
    try {
      await loginUser(username, password);
      router.push('/');  // Redirigir a la pantalla principal después de iniciar sesión
    } catch (error) {
      setErrorMessage('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseScreen>
      <View className="flex-1 justify-center space-y-8 px-4">
        <View className="items-center">
          <Text className="text-3xl font-bold text-[#2c2c66]">Iniciar sesión</Text>
          <Text className="text-gray-500 mt-2 text-center">
            Ingresa para gestionar tus reservas y disfrutar de beneficios.
          </Text>
        </View>

        {/* Mensaje de Error */}
        {errorMessage ? (
          <View className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            <Text className="text-red-700">{errorMessage}</Text>
          </View>
        ) : null}

        <View className="space-y-4">
          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#888"
            className="bg-white px-4 py-3 m-3 rounded-lg border border-gray-300"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <View className="relative">
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}  // Mostrar/Ocultar contraseña
              className="bg-white px-4 py-3 m-3 rounded-lg border border-gray-300 pr-12"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute right-6 top-7"
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className={`bg-[#4a7054] py-4 rounded-full items-center ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-lg">Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/registro')}
          className="items-center mt-4"
        >
          <Text className="text-[#4a7054] text-base font-semibold">¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}
