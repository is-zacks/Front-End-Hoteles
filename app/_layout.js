import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerShown: false, // Oculta el header por defecto
      gestureEnablad: true, 
    }}
  />; 
}
