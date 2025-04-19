import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import HotelCard from '../components/HotelCard';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [ocupacion, setOcupacion] = useState('disponible');
  const [precio, setPrecio] = useState('mejor-precio');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

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
              source={require('../assets/catedral.jpeg')}
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
            <Text style={[styles.authButtonText, { color: '#fff' }]}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero (titulo sobre la imagen) */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Descubre los mejores</Text>
        <Text style={styles.title}>Hoteles en Morelia</Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchBox}>
        <Text style={styles.searchTitle}>Descubre</Text>
        <Text style={styles.searchSubtitle}>Encuentra la mejor opción para ti</Text>

        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
            <FontAwesome name="calendar" size={16} color="#333" />
            <Text style={{ marginLeft: 6 }}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <View style={styles.selectContainer}>
            <MaterialIcons name="person" size={18} color="#333" style={{ marginRight: 4 }} />
            <Picker
              selectedValue={ocupacion}
              style={styles.picker}
              onValueChange={(itemValue) => setOcupacion(itemValue)}
            >
              <Picker.Item label="Disponibilidad" value="disponible" />
              <Picker.Item label="Ocupado" value="ocupado" />
            </Picker>
          </View>

          <View style={styles.selectContainer}>
            <MaterialIcons name="attach-money" size={18} color="#333" style={{ marginRight: 4 }} />
            <Picker
              selectedValue={precio}
              style={styles.picker}
              onValueChange={(itemValue) => setPrecio(itemValue)}
            >
              <Picker.Item label="Mejores Precios" value="mejor-precio" />
              <Picker.Item label="Más Caros" value="mas-caros" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Links temporales para prueba de dashboards */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <Text
          style={{ color: '#409eff', marginBottom: 8 }}
          onPress={() => router.push('/dashboard/camaristas')}
        >
          Ir a Dashboard Camaristas
        </Text>
        <Text
          style={{ color: '#409eff', marginBottom: 8 }}
          onPress={() => router.push('/dashboard/mantenimiento')}
        >
          Ir a Dashboard Mantenimiento
        </Text>
        <Text
          style={{ color: '#409eff' }}
          onPress={() => router.push('/dashboard/admin')}
        >
          Ir a Dashboard Administrador
        </Text>
      </View>

      {/* Categorías */}
      <View style={styles.grid}>
        {['Hoteles', 'Comida', 'Descubre Morelia', 'Servicios', 'Paquetes'].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.card}>
            <Image source={require('../assets/catedral.jpeg')} style={styles.cardImage} />
            <View style={styles.cardOverlay}>
              <Text style={styles.cardText}>{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hoteles Destacados */}
      <View style={styles.hotelesContainer}>
        <Text style={styles.hotelesTitle}>Elige el Hotel que más te convenga</Text>
        <Text style={styles.hotelesSubtitle}>
          Experiencias de todo tipo, vive y conoce la capital Michoacana.
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { id: 1, name: 'Hotel Casa Madero', location: 'Av. Santa María 530', price: 699 },
            { id: 2, name: 'Citi Express Morelia', location: 'Morelia Centro', price: 999 },
            { id: 3, name: 'Hotel Catedral', location: 'Morelia Centro', price: 499 },
          ].map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onPress={() => router.push(`/hotel/${hotel.id}`)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Hoteles de Morelia</Text>
      </View>
    </ScrollView>
  );
}


  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    carouselWrapper: {
      position: 'relative',
    },
    carousel: {
      width: '100%',
      height: 220,
    },
    carouselImage: {
      width: width,
      height: 220,
      resizeMode: 'cover',
    },
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
    authButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    authButtonText: {
      fontSize: 12,
    },
    overlay: {
      position: 'absolute',
      top: 150,
      left: 20,
    },
    title: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
    },
    searchBox: {
      margin: 16,
      backgroundColor: '#e6f2ff',
      borderRadius: 12,
      padding: 16,
    },
    searchTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    searchSubtitle: {
      fontSize: 12,
      color: '#444',
      textAlign: 'center',
      marginBottom: 12,
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 12,
    },
    input: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
    },
    selectContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 8,
      height: 40,
    },
    picker: {
      flex: 1,
      height: 40,
    },
    searchButton: {
      backgroundColor: '#409eff',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    searchButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      paddingBottom: 20,
    },
    card: {
      width: '45%',
      aspectRatio: 1,
      marginVertical: 8,
      borderRadius: 12,
      overflow: 'hidden',
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
    cardOverlay: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: '100%',
      padding: 6,
    },
    cardText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '600',
    },
    hotelesContainer: {
      paddingHorizontal: 16,
      marginBottom: 32,
    },
    hotelesTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 16,
      color: '#000',
    },
    hotelesSubtitle: {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
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
  