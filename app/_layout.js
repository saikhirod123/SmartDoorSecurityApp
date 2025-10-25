import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync(); // Keep splash screen visible while loading fonts

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync(); // Hide splash screen once app is ready
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Return nothing until fonts loaded
  }

  return (
    <Stack
      onLayout={onLayoutRootView}
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Inter_600SemiBold',
          fontWeight: 'bold', // keep for Android fallback
          letterSpacing: 0.2,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'SecureU', headerBackVisible: false,headerLeft: () => null }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="main" options={{ title: 'Main', headerShown: false }} />
      <Stack.Screen name="profile" options={{ title: 'My Profile' }} />
    </Stack>
  );
}
