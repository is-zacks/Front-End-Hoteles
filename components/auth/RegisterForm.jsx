import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterForm({ onRegister }) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="w-full px-6">
      <Text className="text-xl font-bold mb-4 text-center">Crear cuenta</Text>

      <TextInput
        placeholder="Nombre completo"
        className="border border-gray-300 rounded px-4 py-2 mb-3"
        onChangeText={setNombre}
        value={nombre}
      />
      <TextInput
        placeholder="Correo electrónico"
        className="border border-gray-300 rounded px-4 py-2 mb-3"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Contraseña"
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity
        className="bg-[#2c2c66] py-3 rounded-xl items-center"
        onPress={() => onRegister({ email, nombre })}
      >
        <Text className="text-white font-semibold">Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}
