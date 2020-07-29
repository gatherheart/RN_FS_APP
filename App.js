import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, Image, Text, View, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ThemeProvider } from "styled-components";
import { persistCache } from "apollo-cache-persist";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavController from "./components/common/NavController";
import { AuthProvider } from "./context/AuthContext";
import { defaultPoster } from "./constants/Urls";
import { StatusBar } from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { ALBUM_NAME } from "./constants/Systems";

/**
 * By Using Apollo-cache-* modules,
 * A normalized, in-memory cache to dramatically speed up
 * the execution of queries that don't rely on real-time data
 */

export default function App() {
  // For checking if app is loading or not
  const [loaded, setLoaded] = useState(false);
  // Apollo Client
  const [client, setClient] = useState(null);
  // Check User logged in or not
  const [isLoggedIn, setIsloggedIn] = useState(null);

  // Prefeching Image Cache
  const cacheImages = (images) =>
    images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  // Prefetching Font Cache
  const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

  const loadAssets = () => {
    const images = cacheImages([
      require("./assets/splash.png"),
      require("./assets/icon.png"),
      require("./assets/imgs/kakao.png"),
      require("./assets/imgs/toss.png"),
      defaultPoster,
    ]);

    const fonts = cacheFonts([
      Ionicons.font,
      FontAwesome.font,
      MaterialCommunityIcons.font,
      {
        nanumSquareRegular: require("./assets/fonts/NanumSquareRegular.ttf"),
        nanumSquareBold: require("./assets/fonts/NanumSquareBold.ttf"),
      },
    ]);
    return Promise.all([...images, ...fonts]);
  };
  // Preloading all the assets
  const preload = async () => {
    try {
      await loadAssets();
      // Local Memory Cache
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsloggedIn(false);
      } else {
        setIsloggedIn(true);
      }

      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  useMemo(() => {}, []);

  //console.log(loaded, client?.cache?.data?.data, isLoggedIn);
  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content" // Here is where you change the font-color
          />
          <ActionSheetProvider>
            <NavController></NavController>
          </ActionSheetProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading></AppLoading>
  );
}
