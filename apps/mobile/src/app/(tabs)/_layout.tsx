import { Tabs } from 'expo-router';

const tabBarStyle = {
  backgroundColor: '#0D0C0A',
  borderTopColor: '#30281A',
  height: 72,
  paddingTop: 8,
  paddingBottom: 10,
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: '#F0D995',
        tabBarInactiveTintColor: '#817A70',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="actions" options={{ title: 'Actions' }} />
      <Tabs.Screen name="notifications" options={{ title: 'Inbox' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
