import { Tabs } from 'expo-router';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
  return (
    <SafeAreaView className="flex-1 bg-[#fdfaf6]" edges={['top', 'bottom']}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#fdfaf6', borderTopColor: '#d8a48f', height: 60 },
          tabBarActiveTintColor: '#4a7054',
          tabBarInactiveTintColor: '#aaa',
        }}
      >
        <Tabs.Screen name="index" options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={25} color={color} />,
        }} />
        <Tabs.Screen name="booking" options={{
          title: 'Reservas',
          tabBarIcon: ({ color }) => <MaterialIcons name="event" size={29} color={color} />,
        }} />
        
        <Tabs.Screen name="account" options={{
          title: 'Cuenta',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={25} color={color} />,
        }} />
      </Tabs>
    </SafeAreaView>
  );
}
