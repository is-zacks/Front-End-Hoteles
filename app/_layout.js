import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // 👈 habilita gesto hacia atrás en iOS
      }}
    />
  );
}
