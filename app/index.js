import React from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";

export default function App() {
  const [hotels, setHotels] = React.useState([
    {
      id: "1",
      name: "Hotel Casa Madero",
      location: "Av. Acueducto 330",
      price: 699,
      people: 2,
      image: require("../assets/catedral.jpg"),
    },
    {
      id: "2",
      name: "Citi Express Morelia",
      location: "Morelia Centro",
      price: 999,
      people: 30,
      image: require("../assets/catedral.jpg"),
    },
    {
      id: "3",
      name: "Hotel Catedral",
      location: "Morelia Centro",
      price: 499,
      people: 2,
      image: require("../assets/catedral.jpg"),
    },
  ]);
  
  const loadMoreHotels = () => {
    // Simula agregar más hoteles (normalmente vendrían del backend)
    const newHotels = Array.from({ length: 3 }, (_, i) => ({
      id: `${hotels.length + i + 1}`,
      name: `Hotel ${hotels.length + i + 1}`,
      location: "Centro Histórico",
      price: 500 + Math.floor(Math.random() * 500),
      people: 2,
      image: require("../assets/catedral.jpg"),
    }));
    setHotels((prev) => [...prev, ...newHotels]);
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={[styles.navItem, styles.active]}>Inicio</Text>
        <Text style={styles.navItem}>Recien Agregados</Text>
        <Text style={styles.navItem}>Servicios</Text>
        <Text style={styles.navItem}>Habitaciones</Text>
      </View>

      {/* Hero Image */}
      <Image source={require("./assets/catedral.jpg")} style={styles.heroImage} />
      <Text style={styles.heroText}>Descubre los mejores{"\n"}Hoteles en Morelia</Text>

      {/* Buscador */}
      <View style={styles.searchBox}>
        <Text style={styles.searchTitle}>Descubre</Text>
        <Text style={styles.searchSubtitle}>Encuentra la mejor opción para ti</Text>

        <View style={styles.searchRow}>
          <TextInput style={styles.input} placeholder="Fechas" />
          <View style={styles.pickerWrapper}>
            <Ionicons name="person" size={18} color="#000" />
            <Picker style={styles.picker}>
              <Picker.Item label="Disponibilidad" value="disponibilidad" />
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Ionicons name="pricetag" size={18} color="#000" />
            <Picker style={styles.picker}>
              <Picker.Item label="$ Mejores Precios" value="precios" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Categorías */}
      <View style={styles.grid}>
        {[
          { name: "Hoteles", image: require("./assets/catedral.jpg") },
          { name: "Comida", image: require("./assets/catedral.jpg") },
          { name: "Descubre Morelia", image: require("./assets/catedral.jpg") },
          { name: "Servicios", image: require("./assets/catedral.jpg") },
          { name: "Paquetes", image: require("./assets/catedral.jpg") },
        ].map((item, index) => (
          <View style={styles.card} key={index}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.name}</Text>
          </View>
        ))}
      </View>
      <View style={{ paddingHorizontal: 16, marginBottom: 40 }}>
  <Text style={{ color: "#5aa3f0", fontSize: 14, marginBottom: 4 }}>Hoteles</Text>
  <Text style={{ fontSize: 24, fontWeight: "bold" }}>Elige el Hotel que más te convenga</Text>
  <Text style={{ color: "#555", fontSize: 14, marginBottom: 20 }}>
    Experiencias de todo tipo, vive y conoce la capital Michoacana.
  </Text>

  <FlatList
    data={hotels}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id}
    onEndReached={loadMoreHotels}
    onEndReachedThreshold={0.5}
    renderItem={({ item }) => (
      <View style={styles.hotelCard}>
        <Image source={item.image} style={styles.hotelImage} />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 10, color: "#888" }}>Hotel</Text>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
            <Ionicons name="location" size={12} color="#888" />
            <Text style={{ fontSize: 10, marginLeft: 4 }}>{item.location}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>${item.price} <Text style={{ fontSize: 10 }}>/noche</Text></Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="person" size={14} color="#333" />
              <Text style={{ fontSize: 12, marginLeft: 4 }}>{item.people}</Text>
            </View>
          </View>
        </View>
      </View>
    )}
  />
</View>




    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f1f1f1",
    paddingVertical: 10,
  },
  navItem: {
    fontSize: 14,
    color: "#333",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  active: {
    backgroundColor: "#e5eaff",
    color: "#1a4fff",
  },
  heroImage: {
    width: "100%",
    height: 200,
  },
  heroText: {
    position: "absolute",
    top: 160,
    left: 20,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  searchBox: {
    backgroundColor: "#e6f1f9",
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  searchSubtitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  picker: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: "#5aa3f0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  card: {
    width: "45%",
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  hotelCard: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  hotelImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  


});