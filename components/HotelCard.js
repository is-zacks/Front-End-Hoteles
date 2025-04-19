// components/HotelCard.js
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HotelCard({ hotel, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={require('../assets/catedral.jpeg')} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.label}>Hotel</Text>
        <Text style={styles.name}>{hotel.name}</Text>
        <View style={styles.meta}>
          <MaterialIcons name="location-on" size={14} color="#777" />
          <Text style={styles.location}>{hotel.location}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${hotel.price}</Text>
          <Text style={styles.unit}>/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  info: {
    padding: 10,
  },
  label: {
    fontSize: 10,
    color: '#999',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
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
  unit: {
    fontSize: 12,
    color: '#777',
    marginLeft: 4,
  },
});
