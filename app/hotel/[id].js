import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
  import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
  import { useRouter, useLocalSearchParams } from 'expo-router';
  import RoomCard from '../../components/RoomCard';
  
  const { width } = Dimensions.get('window');
  
  export default function HotelScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
  
    const hotel = {
      name: 'Hotel Catedral',
      location: 'Morelia Centro',
      phone: '+52 4443876521',
    };
  
    const rooms = [
      {
        id: 1,
        title: 'Habitacion VIP',
        capacity: 8,
        price: 999,
        features: ['Ba\u00f1o', 'WiFi', 'Aire Acond', '2x Individual', 'Limpieza'],
      },
      {
        id: 2,
        title: 'Habitacion VIP',
        capacity: 4,
        price: 999,
        features: ['Ba\u00f1o', 'WiFi', 'Aire Acond', '2x Individual', 'Limpieza'],
      },
    ];
  
    return (
      <ScrollView style={styles.container}>
        {/* Carrusel decorativo */}
        <View style={styles.carouselWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {[1, 2, 3].map((i) => (
              <Image
                key={i}
                source={require('../../assets/catedral.jpeg')}
                style={styles.carouselImage}
              />
            ))}
          </ScrollView>
  
          {/* Iconos de login y registro sobre la imagen */}
          <View style={styles.authButtonsContainerAbsolute}>
            <TouchableOpacity style={styles.authButton} onPress={() => router.push('/registro')}>
              <FontAwesome name="user-plus" size={18} color="#fff" />
              <Text style={[styles.authButtonText, { color: '#fff' }]}>Crear Cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={() => router.push('/login')}>
              <FontAwesome name="user" size={18} color="#fff" />
              <Text style={[styles.authButtonText, { color: '#fff' }]}>Iniciar Sesion</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        {/* Info del Hotel */}
        <View style={styles.hotelInfo}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <Text style={styles.hotelLocation}><FontAwesome name="map-marker" /> {hotel.location}</Text>
          <Text style={styles.hotelPhone}><FontAwesome name="phone" /> {hotel.phone}</Text>
        </View>
  
        {/* Habitaciones */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Habitaciones</Text>
          <Text style={styles.sectionTitle}>Elige tu habitacion</Text>
          <Text style={styles.sectionSubtitle}>Servicios Especiales no incluidos.</Text>
        </View>
  
        <View style={styles.roomsContainer}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </View>
  
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Hoteles de Morelia</Text>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    carouselWrapper: { position: 'relative' },
    carousel: { width: '100%', height: 220 },
    carouselImage: { width, height: 220, resizeMode: 'cover' },
    authButtonsContainerAbsolute: {
      position: 'absolute',
      top: 20,
      right: 20,
      flexDirection: 'row',
      gap: 12,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 6,
      borderRadius: 10,
    },
    authButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    authButtonText: { fontSize: 12 },
    hotelInfo: {
      paddingHorizontal: 16,
      marginTop: 20,
    },
    hotelName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#222',
    },
    hotelLocation: { fontSize: 16, marginTop: 4 },
    hotelPhone: { fontSize: 16, marginTop: 2 },
    section: {
      paddingHorizontal: 16,
      marginTop: 24,
    },
    sectionLabel: {
      fontSize: 14,
      color: '#409eff',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    sectionSubtitle: {
      fontSize: 12,
      color: '#666',
      marginBottom: 12,
    },
    roomsContainer: {
      gap: 16,
      paddingHorizontal: 16,
      marginBottom: 32,
    },
    footer: {
      backgroundColor: '#000',
      padding: 20,
      alignItems: 'center',
    },
    footerText: {
      color: '#fff',
      fontSize: 12,
    },
  });
  