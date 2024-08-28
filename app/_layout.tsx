import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SplashScreen, Stack, useNavigationContainerRef, useRouter} from "expo-router";
import {useColorScheme} from "react-native";
import {useEffect, useState} from "react";
import {useFonts} from "expo-font";
import {StorageService} from "@/src/services/storage.service";
import React from "react";
import {PaperProvider} from "react-native-paper";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {AuthService} from "@/src/services/auth.service";
import * as Sentry from '@sentry/react-native';
import {config} from "@/src/services/context.service";
import {isRunningInExpoGo} from "expo";
import {RoutesEnum} from "@/src/constants/routesEnum";

const queryClient = new QueryClient();

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
Sentry.init({
  dsn: config.sentry.dsn,
  debug: config.sentry.debug,
  environment: config.environment,
  release: config.release,
  enabled: config.environment !== 'development',
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableNativeFramesTracking: !isRunningInExpoGo(),
    }),
  ]
});

function RootLayout() {
  const ref = useNavigationContainerRef();
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await StorageService.getFromSecureStorage('bearer');
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      async function checkProfile() {
        try {
          const hasCompletedProfile = await AuthService.hasCompletedProfile();
          setHasProfile(hasCompletedProfile);
        } catch (e) {
          console.warn(e);
        }
      }

      checkProfile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (fontsLoaded && appIsReady) {
      if (isAuthenticated && hasProfile) {
        router.push(RoutesEnum.MESSAGE_ROUTE);
      } else if (isAuthenticated && !hasProfile) {
        router.push(RoutesEnum.CREATE_PROFILE_ROUTE);
      }
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady, isAuthenticated, hasProfile]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found"/>
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default Sentry.wrap(RootLayout);
