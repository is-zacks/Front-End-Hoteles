import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Iniciar sesión con:', email, password);
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Iniciar Sesión',
          headerShown: true,
          gestureEnabled: true, // 👈 habilita el gesto de regreso
        }}
      />
      <View className="flex-1 justify-center items-center px-6 bg-white">
        <Text className="text-2xl font-bold mb-6">Bienvenido</Text>

        <TextInput
          className="border border-gray-300 p-3 rounded w-full mb-3"
          placeholder="Correo electrónico"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          className="border border-gray-300 p-3 rounded w-full mb-6"
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded" onPress={handleLogin}>
          <Text className="text-white font-semibold">Entrar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
