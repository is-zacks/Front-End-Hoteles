import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useLayoutEffect } from 'react';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from '../../../../components/BaseScreen'; 

export default function Step1Reserva() {
  const router = useRouter();
  const { hotelId, roomId, precio } = useLocalSearchParams();
  const [rango, setRango] = useState({});
  const [huespedes, setHuespedes] = useState(1);
  const navigation = useNavigation();
  const today = new Date().toISOString().split('T')[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Datos de contacto',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fdfaf6', // Fondo claro y cálido
      },
      headerTintColor: '#111', // Íconos y texto del header
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
      ),
    });
  }, []);
  

  const seleccionarRango = (day) => {
    if (!rango.startDate || (rango.startDate && rango.endDate)) {
      setRango({ startDate: day.dateString, endDate: '', markedDates: {} });
    } else {
      const start = new Date(rango.startDate);
      const end = new Date(day.dateString);
      if (end > start) {
        const fechas = generarRangoFechas(rango.startDate, day.dateString);
        const marcadas = {};
        fechas.forEach((fecha, i) => {
          marcadas[fecha] = {
            startingDay: i === 0,
            endingDay: i === fechas.length - 1,
            color: '#4a7054',
            textColor: 'white',
          };
        });
        setRango({
          startDate: rango.startDate,
          endDate: day.dateString,
          markedDates: marcadas,
        });
      } else {
        setRango({ startDate: day.dateString, endDate: '', markedDates: {} });
      }
    }
  };

  const generarRangoFechas = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const calcularNoches = () => {
    if (!rango.startDate || !rango.endDate) return 0;
    const start = new Date(rango.startDate);
    const end = new Date(rango.endDate);
    const diferencia = (end - start) / (1000 * 60 * 60 * 24);
    return Math.max(1, diferencia);
  };

  const total = calcularNoches() * Number(precio || 0);

  const continuar = () => {
    if (rango.startDate && rango.endDate) {
      router.push({
        pathname: `/reserva/${hotelId}/${roomId}/step2`,
        params: {
          startDate: rango.startDate,
          endDate: rango.endDate,
          guests: huespedes,
        },
      });
    } else {
      alert('Por favor selecciona un rango de fechas válido');
    }
  };

  return (
    <BaseScreen>
      <View className="flex-1">
        <ScrollView
          className="flex-1 px-4 pt-6"
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Rango seleccionado */}
          <View className="mb-4 flex-row justify-between bg-gray-100 p-4 rounded-xl">
            <View>
              <Text className="text-sm text-gray-500">Check-in</Text>
              <Text className="text-base font-semibold text-gray-800">
                {rango.startDate || '—'}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Check-out</Text>
              <Text className="text-base font-semibold text-gray-800">
                {rango.endDate || '—'}
              </Text>
            </View>
          </View>

          {/* Calendario */}
          <Calendar
            minDate={today}
            onDayPress={seleccionarRango}
            markingType="period"
            markedDates={rango.markedDates}
            theme={{
              todayTextColor: '#4a7054',
              arrowColor: '#4a7054',
              selectedDayBackgroundColor: '#4a7054',
            }}
          />

          {/* Huéspedes */}
          <View className="mt-8 bg-white shadow-sm p-4 rounded-xl">
            <Text className="text-lg font-semibold text-gray-800 mb-2">Huéspedes</Text>
            <View className="flex-row items-center justify-between px-4 py-2">
              <TouchableOpacity onPress={() => setHuespedes(Math.max(1, huespedes - 1))}>
                <Ionicons name="remove-circle" size={28} color="#4a7054" />
              </TouchableOpacity>
              <Text className="text-xl font-bold">{huespedes}</Text>
              <TouchableOpacity onPress={() => setHuespedes(huespedes + 1)}>
                <Ionicons name="add-circle" size={28} color="#4a7054" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Resumen de precios */}
          {rango.startDate && rango.endDate && (
            <View className="mt-6 bg-white shadow-sm p-4 rounded-xl border border-gray-100">
              <Text className="text-base text-gray-700">
                Precio por noche: <Text className="font-semibold">${precio}</Text>
              </Text>
              <Text className="text-base text-gray-700">
                Noches: <Text className="font-semibold">{calcularNoches()}</Text>
              </Text>
              <View className="flex-row justify-between mt-2">
                <Text className="text-lg font-bold text-gray-800">Total:</Text>
                <Text className="text-lg font-bold text-[#4a7054]">${total}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Botón fijo abajo */}
        <View className="absolute bottom-0 left-0 right-0  p-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={continuar}
            className="bg-[#4a7054] py-4 rounded-full items-center shadow-md"
          >
            <Text className="text-white font-bold text-lg">Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseScreen>
  );
}
