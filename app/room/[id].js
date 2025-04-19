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
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ReservaModal from '../../components/ReservaModal';

const { width } = Dimensions.get('window');

export default function RoomScreen() {
  const { id } = useLocalSearchParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRoom({
        id,
        title: 'Habitación Doble Estándar',
        size: '35 m²',
        beds: '2 camas dobles',
        description:
          'Esta habitación cuenta con aire acondicionado y TV por cable. El baño privado incluye artículos de aseo gratuitos y, bajo petición, secador de pelo.',
        bathroom: ['Artículos de aseo gratis', 'Ducha', 'WC', 'Toallas', 'Papel higiénico'],
        view: 'Vistas',
        services: [
          'Aire acondicionado',
          'Ropa de cama',
          'Enchufe cerca de la cama',
          'Escritorio',
          'TV',
          'Mosquitera',
          'Canales vía satélite',
          'TV de pantalla plana',
          'Ventilador',
          'Servicio de despertador',
          'Armario',
          'Toda la unidad en planta baja',
        ],
        policies: 'No se puede fumar',
        price: 999,
        images: [
          require('../../assets/catedral.jpeg'),
          require('../../assets/catedral.jpeg'),
          require('../../assets/catedral.jpeg'),
        ],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

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
        {room.images.map((img, idx) => (
          <Image key={idx} source={img} style={styles.image} />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <Text style={styles.title}>{room.title}</Text>
        <View style={styles.featuresRow}>
          <Text style={styles.feature}><MaterialIcons name="square-foot" /> {room.size}</Text>
          <Text style={styles.feature}><FontAwesome name="eye" /> {room.view}</Text>
          <Text style={styles.feature}><MaterialIcons name="ac-unit" /> Aire</Text>
          <Text style={styles.feature}><FontAwesome name="wifi" /> WiFi</Text>
        </View>

        <Text style={styles.section}><Text style={styles.sectionBold}>Tamaño:</Text> {room.size}</Text>
        <Text style={styles.section}><Text style={styles.sectionBold}>Camas:</Text> {room.beds}</Text>
        <Text style={styles.section}>{room.description}</Text>

        <Text style={styles.sectionTitle}>En el baño privado:</Text>
        {room.bathroom.map((item, i) => <Text key={i} style={styles.listItem}>✓ {item}</Text>)}

        <Text style={styles.sectionTitle}>Servicios:</Text>
        {room.services.map((item, i) => <Text key={i} style={styles.listItem}>✓ {item}</Text>)}

        <Text style={styles.sectionTitle}>Política de humo:</Text>
        <Text style={styles.listItem}>{room.policies}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${room.price}</Text>
          <Text style={styles.perNight}>/noche</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setMostrarModal(true)}>
          <Text style={styles.buttonText}>Reservar ahora</Text>
        </TouchableOpacity>
      </View>

      <ReservaModal
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        habitacionId={room.id}
      />
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