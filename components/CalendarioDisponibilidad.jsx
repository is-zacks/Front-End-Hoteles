import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarioDisponibilidad({ rango, setRango }) {
  const seleccionarRango = (day) => {
    if (!rango.startDate || (rango.startDate && rango.endDate)) {
      setRango({ startDate: day.dateString, endDate: '' });
    } else {
      const start = new Date(rango.startDate);
      const end = new Date(day.dateString);
      if (end > start) {
        const fechasRango = generarRangoFechas(rango.startDate, day.dateString);
        const marcadas = {};
        fechasRango.forEach((fecha, i) => {
          marcadas[fecha] = {
            startingDay: i === 0,
            endingDay: i === fechasRango.length - 1,
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
        setRango({ startDate: day.dateString, endDate: '' });
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

  return (
    <View className="p-4 bg-white">
      <Text className="text-lg font-semibold mb-2">Selecciona tu estadía</Text>
      <Calendar
        onDayPress={seleccionarRango}
        markingType="period"
        markedDates={rango.markedDates || {}}
      />
    </View>
  );
}

