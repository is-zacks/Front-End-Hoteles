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
import ReservaModal from '../../components/ReservaModal';
import { hoteles } from '../../data/hoteles';

const { width } = Dimensions.get('window');

export default function RoomScreen() {
  const { id, hotelId } = useLocalSearchParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const hotel = hoteles.find((h) => h.id === Number(hotelId));
    const roomFound = hotel?.rooms.find((r) => r.id === Number(id));
    if (roomFound) {
      setRoom(roomFound);
    }
    setLoading(false);
  }, [id, hotelId]);

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
        {room.imagenes ? room.imagenes.map((img, idx) => (
          <Image key={idx} source={img} style={styles.image} />
        )) : (
          <Image source={require('../../assets/catedral.jpeg')} style={styles.image} />
        )}
      </ScrollView>

      <View style={styles.content}>
        <Text style={styles.title}>{room.title}</Text>

        <View style={styles.featuresRow}>
          <Text style={styles.feature}><MaterialIcons name="square-foot" /> {room.size || 'Tamaño N/D'}</Text>
          <Text style={styles.feature}><FontAwesome name="eye" /> {room.view || 'Vista N/D'}</Text>
          <Text style={styles.feature}><MaterialIcons name="ac-unit" /> Aire</Text>
          <Text style={styles.feature}><FontAwesome name="wifi" /> WiFi</Text>
        </View>

        <Text style={styles.section}><Text style={styles.sectionBold}>Capacidad:</Text> {room.capacity} personas</Text>
        <Text style={styles.section}><Text style={styles.sectionBold}>Precio:</Text> ${room.price} por noche</Text>
        <Text style={styles.section}>{room.description || 'Descripción no disponible.'}</Text>

        <Text style={styles.sectionTitle}>Servicios:</Text>
        {room.services.map((item, i) => (
          <Text key={i} style={styles.listItem}>✓ {item}</Text>
        ))}

        <View style={styles.priceRow}>
          <Text style={styles.price}>${room.price}</Text>
          <Text style={styles.perNight}>/noche</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setMostrarModal(true)}>
          <Text style={styles.buttonText}>Reservar ahora</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({
          pathname: `/reserva/${hotelId}/${room.id}/step1`,
          params: { precio: room.price },
        })}
        >
        <Text style={styles.buttonText}>Reservar ahora</Text>
      </TouchableOpacity>
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
