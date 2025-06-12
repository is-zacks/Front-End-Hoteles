import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import api from '../../src/api/client';

const { width } = Dimensions.get('window');

export default function RoomScreen() {
  const { id } = useLocalSearchParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    api.get(`/habitaciones/${id}/`)
      .then(res => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar habitación:', err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (room) {
      navigation.setOptions({
        title: room.title,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 8 }}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        ),
      });
    }
  }, [room]);

  if (loading || !room) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#409eff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {room.images.length > 0 ? (
          room.images.map((img, idx) => (
            <Image key={idx} source={{ uri: img.image_url }} style={styles.image} />
          ))
        ) : (
          <Image source={require('../../assets/catedral.jpeg')} style={styles.image} />
        )}
      </ScrollView>

      <View style={styles.content}>
        <Text style={styles.title}>{room.title}</Text>

        <View style={styles.featuresRow}>
          <Text style={styles.feature}><MaterialIcons name="square-foot" /> {room.size || 'N/A'}</Text>
          <Text style={styles.feature}><FontAwesome name="eye" /> {room.view || 'N/A'}</Text>
          <Text style={styles.feature}><MaterialIcons name="bed" /> {room.beds || 'N/A'}</Text>
        </View>

        <Text style={styles.section}><Text style={styles.sectionBold}>Precio:</Text> ${room.price_per_night} por noche</Text>
        <Text style={styles.section}><Text style={styles.sectionBold}>Políticas:</Text> {room.policies || 'No especificadas'}</Text>
        <Text style={styles.section}>{room.description || 'Descripción no disponible.'}</Text>

        <Text style={styles.sectionTitle}>Servicios:</Text>
        {room.services.map((item, i) => (
          <Text key={i} style={styles.listItem}>✓ {item.name}</Text>
        ))}

        <Text style={styles.sectionTitle}>Baño:</Text>
        {room.bathroom.map((item, i) => (
          <Text key={i} style={styles.listItem}>• {item.name}</Text>
        ))}

        <View style={styles.priceRow}>
          <Text style={styles.price}>${room.price_per_night}</Text>
          <Text style={styles.perNight}>/noche</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({
            pathname: `/reserva/${room.hotel}/${room.id}/step1`,
            params: { precio: room.price_per_night, nombre_habitacion: room.title },
          })}
        >
          <Text style={styles.buttonText}>Reservar ahora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width, height: 250, resizeMode: 'cover' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  featuresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  feature: { fontSize: 12, color: '#555' },
  section: { fontSize: 14, marginBottom: 6 },
  sectionBold: { fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  listItem: { fontSize: 14, color: '#333', marginBottom: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 16 },
  price: { fontSize: 22, fontWeight: 'bold' },
  perNight: { fontSize: 14, color: '#777', marginLeft: 4 },
  button: { backgroundColor: '#409eff', padding: 12, marginTop: 20, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
