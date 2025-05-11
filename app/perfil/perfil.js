import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import BaseScreen from '../../components/BaseScreen';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, updateUserProfile } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Selecciona tus fechas',
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
    }, []);

  // Función para actualizar el perfil
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateUserProfile(username, email);
      Alert.alert('Perfil actualizado', 'Tus datos han sido guardados.');
      router.push('/account');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <BaseScreen>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 justify-center space-y-8 p-4">
          <View className="items-center">
            <Text className="text-3xl font-bold text-[#2c2c66]">Editar Perfil</Text>
          </View>

          <View className="space-y-4">
            <TextInput
              placeholder="Nombre de usuario"
              placeholderTextColor="#888"
              className="bg-white px-4 py-3 m-3 rounded-lg border border-gray-300"
              value={username}
              onChangeText={setUsername}
              onBlur={Keyboard.dismiss}  // Ocultar teclado al salir del campo
            />
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#888"
              className="bg-white px-4 py-3 m-3 rounded-lg border border-gray-300"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={Keyboard.dismiss}  // Ocultar teclado al salir del campo
            />
          </View>

          <TouchableOpacity
            onPress={handleUpdateProfile}
            className="bg-[#4a7054] py-4 rounded-full items-center"
            disabled={loading}
          >
            <Text className="text-white font-semibold text-lg">
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Text>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    </BaseScreen>
  );
}
