import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { persistCache } from "apollo-cache-persist";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient, { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import apolloClientOptions from "./apollo";

/**
 * By Using Apollo-cache-* modules,
 * A normalized, in-memory cache to dramatically speed up
 * the execution of queries that don't rely on real-time data
 */

const QUERY = gql`
  {
    allUsers {
      id
    }
  }
`;

export default function App() {
  // For checking if app is loading or not
  const [loaded, setLoaded] = useState(false);
  // Apollo Client
  const [client, setClient] = useState(null);

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
    ]);

    const fonts = cacheFonts([Ionicons.font, FontAwesome.font]);
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
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preload();
  }, []);
  return loaded && client ? (
    <ApolloProvider client={client}>
      <View>
        <Text>"Hello World"</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading></AppLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
