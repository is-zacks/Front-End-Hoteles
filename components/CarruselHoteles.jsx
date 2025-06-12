import React from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  require('../assets/catedral.jpeg'),
  require('../assets/catedral.jpeg'),
  require('../assets/catedral.jpeg'),
];

export default function CarruselHoteles() {
  return (
    <View className="mt-6">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="rounded-sm"
        >
        {images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={{
              width: width,
              height: 250, // tamaño grande
              resizeMode: 'cover',
              borderRadius: 1,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
