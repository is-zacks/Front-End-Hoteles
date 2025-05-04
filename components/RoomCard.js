import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function RoomCard({ room, hotelId }) {
    const router = useRouter();

  return (
    
    <TouchableOpacity onPress={() => router.push({ pathname: `/room/${room.id}`, params: { hotelId } })}
    style={styles.card}>
    <Image source={require('../assets/catedral.jpeg')} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{room.title}</Text>

      <View style={styles.row}>
        <Text style={styles.meta}><FontAwesome name="users" /> {room.capacity}</Text>
        <Text style={styles.meta}><FontAwesome name="bath" /> Baño</Text>
      </View>

      <View style={styles.row}>
        {room.services.includes('WiFi') && (
          <Text style={styles.meta}><MaterialIcons name="wifi" /> WiFi</Text>
        )}
        {room.services.includes('Aire Acond') && (
          <Text style={styles.meta}><MaterialIcons name="ac-unit" /> Aire Acond</Text>
        )}
      </View>

      <View style={styles.row}>
        {room.services.includes('2x Individual') && (
          <Text style={styles.meta}>2x Individual</Text>
        )}
        {room.services.includes('Limpieza') && (
          <Text style={styles.meta}><MaterialIcons name="cleaning-services" /> Limpieza</Text>
        )}
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>${room.price}</Text>
        <Text style={styles.perNight}>/night</Text>
      </View>
    </View>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#555',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  perNight: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
});
