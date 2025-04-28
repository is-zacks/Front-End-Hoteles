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

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  return (
    <>
      <ScrollView className="bg-[#fdfaf6] flex-1">
        <HeaderSuperior />
        <SearchBar />
        <CarruselHoteles />
        <FiltroTipos />
        <HotelesDestacados onSelect={(id) => router.push(`/hotel/${id}`)} />
      </ScrollView>

    </>
  );
}
