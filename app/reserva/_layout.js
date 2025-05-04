import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Oculta el header por defecto
        gestureEnabled: true,
        presentation: "card",
      }}
    />
  );
}