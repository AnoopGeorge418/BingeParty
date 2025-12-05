import '@/global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toasts } from '@backpackapp-io/react-native-toast';

export default function RootLayout() {

  const [fontLoaded] = useFonts({
    "Sora-Regular": require("../assets/fonts/Sora-Regular.ttf"),
    "Sora-Bold": require("../assets/fonts/Sora-Bold.ttf"),
    "Sora-Light": require("../assets/fonts/Sora-Light.ttf"),
  });
2
  if ( !fontLoaded ) {
    return (
      <View className='flex-1  items-center justify-center bg-background'>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GluestackUIProvider mode="dark">
          <Stack screenOptions={{
              animation: "slide_from_right",
              gestureEnabled: true,
              animationDuration: 400,
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />

        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>

  );
}
