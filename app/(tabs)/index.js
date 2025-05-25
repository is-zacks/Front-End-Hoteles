import React, { useState } from 'react';
import "../../global.css";
import { ScrollView, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HeaderSuperior from '../../components/HeaderSuperior';
import CarruselHoteles from '../../components/CarruselHoteles';
import HotelesDestacados from '../../components/HotelesDestacados';
import SearchBar from '../../components/SearchBar';
import FiltroTipos from '../../components/FiltroTipos';
import OfertasDestacadas from '../../components/OfertasDestacadas';
import OpinionesClientes from '../../components/OpinionesCliente';
import HotelesFiltrados from '../../components/HotelesFiltrados';
import Footer from '../../components/Footer';


export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('Todos');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filtro, setFiltro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  

  const handleSelectOferta = (id) => {
    console.log('Oferta seleccionada:', id);
  };

  const handleTipoSelect = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterApply = (selectedFilters) => {
    setFiltro(selectedFilters);
    setModalVisible(false);
  };
  return (
    <>
      <ScrollView className="bg-[#fdfaf6] flex-1">
        <HeaderSuperior />
        <SearchBar onSearch={handleSearch} onFilter={() => setModalVisible(true)} />
        <CarruselHoteles />
        <FiltroTipos onSelectTipo={handleTipoSelect} />
        <HotelesFiltrados tipoSeleccionado={tipoSeleccionado} />
        <HotelesDestacados onSelect={(id) => router.push(`/hotel/${id}`)} />
        <OfertasDestacadas onSelect={handleSelectOferta} />
        <OpinionesClientes />
        <Footer />
        {/* <MapaHotels /> */}
      </ScrollView>

    </>
  );
}
