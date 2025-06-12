import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

export default function CrearServicio() {
  const router = useRouter();
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  // Configuración del encabezado dinámico
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Crear Nuevo Servicio',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fdfaf6',
      },
      headerTintColor: '#111',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleGuardar = () => {
    if (!nombre || !precio) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    // Aquí va la lógica POST para crear el servicio en el backend
    Alert.alert('Servicio creado', `Se ha creado el servicio: ${nombre}`);
    router.back();
  };

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Servicio</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del servicio"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          keyboardType="numeric"
          value={precio}
          onChangeText={setPrecio}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdfaf6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c2c66',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#4a7054',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
