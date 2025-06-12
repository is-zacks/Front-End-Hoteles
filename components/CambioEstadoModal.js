// components/CambioEstadoModal.js
import React from 'react';
import { View, Text, Pressable, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CambioEstadoModal({ visible, opciones, onClose, onSelect }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose} // Para Android: cerrar con el botón de atrás
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-10">
        <View className="bg-white rounded-2xl w-80 shadow-lg p-5">
          {/* Título del Modal */}
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            Cambiar Estado
          </Text>

          {/* Opciones de Estado */}
          {opciones.map((op) => (
            <Pressable
              key={op.estado}
              className={`flex-row items-center justify-between bg-gray-100 rounded-xl p-4 mb-2 ${
                Platform.OS === 'ios' ? 'shadow-sm' : 'elevation-3'
              }`}
              android_ripple={{ color: '#e0e0e0', borderless: false }}
              onPress={() => onSelect(op.estado)}
            >
              <View className="flex-row items-center gap-3">
                <Ionicons name={op.icon} size={28} color="#555" />
                <Text className="text-lg font-semibold text-gray-800">{op.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#888" />
            </Pressable>
          ))}

          {/* Botón de Cancelar */}
          <Pressable
            className="mt-4 py-3 rounded-xl items-center bg-red-600"
            onPress={onClose}
            android_ripple={{ color: '#b22222', borderless: false }}
          >
            <Text className="text-white font-semibold text-lg">Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
