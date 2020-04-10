import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function App() {
  // For checking if app is loading or not
  const [loaded, setLoaded] = useState(false);

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
  const preload = async () => {
    try {
      await loadAssets();
    } catch (e) {
      console.log(e);
    }
    setLoaded(true);
  };

  useEffect(() => {
    preload();
  }, []);
  return loaded ? (
    <View>
      <Text>"Hello World"</Text>
    </View>
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
