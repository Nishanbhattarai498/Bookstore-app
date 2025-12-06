import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "@/components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from "react";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function RootLayout() {

  const router = useRouter();
  const segments =useSegments();

  const {checkAuth,user,token} = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    checkAuth();
    setIsMounted(true);
  }, [])

  // handle the navigation based on auth state
  useEffect(() => {
    if (!isMounted) return;

    const inAuthScreen= segments[0]==="(auth)";
    const isSignedIn = user && token;

    // if user is not logged in and not in auth screens, redirect to auth
    if(!isSignedIn && !inAuthScreen){
      router.replace("/(auth)");
    }
    // if user is logged in and in auth screens, redirect to main app
    else if(isSignedIn && inAuthScreen){
      router.replace("/(tabs)");
    }
  }, [user,segments,token, isMounted])





  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </SafeScreen>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
