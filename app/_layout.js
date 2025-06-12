import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext'; // Ruta correcta

export default function RootLayout() {
  return(
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Oculta el header por defecto
          gestureEnablad: true, 
        }}/> 
    </AuthProvider>
  ); 
}
