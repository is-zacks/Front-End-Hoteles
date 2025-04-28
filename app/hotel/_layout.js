import { Stack } from 'expo-router';

export default function HotelLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: 'card',
      }}
    />
  );
}
