import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

export default function EditarServicio() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  // Configuración del encabezado dinámico
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Editar Servicio',
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
  }, [navigation, id]);

  // Simulación de carga inicial
  useEffect(() => {
    // Aquí puedes hacer una llamada al backend para obtener el servicio por ID
    setNombre('Spa Premium');
    setPrecio('300');
  }, [id]);

  const handleActualizar = () => {
    if (!nombre || !precio) {
      alert('Todos los campos son obligatorios');
      return;
    }
    // Lógica para actualizar el servicio en el backend
    alert('Servicio actualizado');
    router.back();
  };

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Editar Servicio</Text>
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
        <TouchableOpacity style={styles.updateButton} onPress={handleActualizar}>
          <Text style={styles.updateButtonText}>Actualizar</Text>
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
  updateButton: {
    backgroundColor: '#4a7054',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
