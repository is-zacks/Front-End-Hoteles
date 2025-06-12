import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import BaseScreen from '../components/BaseScreen';
import { useAuth } from '../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function Registro() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerUser } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await registerUser(username, email, password);
      Alert.alert('Registro exitoso');
      router.push('/login');  // Redirigir al login después de registrarse
    } catch (error) {
      Alert.alert('Error en el registro', error.message);
    }
  };

  return (
    <BaseScreen>
      <View className="flex-1 justify-center space-y-8">
        <View className="items-center">
          <Text className="text-3xl font-bold text-[#2c2c66]">Crear cuenta</Text>
          <Text className="text-gray-500 mt-2 text-center px-8">
            Únete para explorar los mejores hoteles de Morelia.
          </Text>
        </View>

        <View className="space-y-4">
          <TextInput
            placeholder="Nombre de usuario"
            placeholderTextColor="#888"
            className="bg-white px-4 py-3 m-3 rounded-lg border border-gray-300"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#888"
            className="bg-white px-4 py-3 m-3 rounded-lg border border-gray-300"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campo de contraseña */}
          <View className="relative">
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              className="bg-white px-4 py-3 m-3 rounded-lg border border-gray-300"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute right-4 top-6"
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Campo de confirmar contraseña */}
          <View className="relative">
            <TextInput
              placeholder="Confirmar contraseña"
              placeholderTextColor="#888"
              secureTextEntry={!showConfirmPassword}
              className="bg-white px-4 py-3 m-3 rounded-lg border border-gray-300"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={toggleConfirmPasswordVisibility}
              className="absolute right-4 top-6"
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          className="bg-[#4a7054] py-4 rounded-full items-center"
        >
          <Text className="text-white font-semibold text-lg">Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/login')}
          className="items-center mt-4"
        >
          <Text className="text-[#4a7054] text-base font-semibold">¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}
