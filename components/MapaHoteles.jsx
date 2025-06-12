import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';

const hotelesFicticios = [
  {
    id: 1,
    name: 'Hotel Catedral',
    description: 'Cerca del Centro Histórico',
    latitude: 19.7025,
    longitude: -101.1943,
  },
  {
    id: 2,
    name: 'Hotel Boutique La Casona',
    description: 'Estilo colonial en el centro',
    latitude: 19.7041,
    longitude: -101.1882,
  },
];

export default function MapHotelsOSM() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita acceso a la ubicación para mostrar el mapa.');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#4a7054" style={{ marginTop: 20 }} />;
  }

  if (!location) {
    return (
      <View className="p-4">
        <Text className="text-red-500">No se pudo obtener la ubicación actual.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-extrabold text-gray-800 mb-4">Mapa de Hoteles (OSM)</Text>
      <MapView
        provider={null}  // Para usar OpenStreetMap
        style={{ width: '100%', height: 400, borderRadius: 10 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {hotelesFicticios.map((hotel) => (
          <Marker
            key={hotel.id}
            coordinate={{ latitude: hotel.latitude, longitude: hotel.longitude }}
            title={hotel.name}
            description={hotel.description}
            pinColor="#4a7054"
          />
        ))}
      </MapView>
    </View>
  );
}
