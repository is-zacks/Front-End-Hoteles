import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../src/context/AuthContext';

export default function Registro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useAuth();

  const handleRegister = async () => {
    try {
      await registerUser(username, email, password);
      Alert.alert('Registro exitoso');
    } catch (error) {
      Alert.alert('Error en el registro', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Registro</Text>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: 'green', padding: 10 }}>
        <Text style={{ color: 'white' }}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
