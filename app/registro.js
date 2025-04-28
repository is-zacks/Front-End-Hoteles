import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BaseScreen from '../components/BaseScreen'; // Asegúrate de que la ruta sea correcta

export default function RegisterScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            placeholder="Nombre completo"
            placeholderTextColor="#888"
            className="bg-white px-4 py-3 rounded-lg border border-gray-300"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor="#888"
            className="bg-white px-4 py-3 rounded-lg border border-gray-300"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry
            className="bg-white px-4 py-3 rounded-lg border border-gray-300"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          onPress={() => {/* lógica de registro */}}
          className="bg-[#4a7054] py-4 rounded-full items-center"
        >
          <Text className="text-white font-semibold text-lg">Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/login')}
          className="items-center mt-4"
        >
          <Text className="text-[#4a7054] text-base font-semibold">¿Ya tienes cuenta? Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}
