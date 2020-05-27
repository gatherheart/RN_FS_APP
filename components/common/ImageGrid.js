import React from "react";
import { Block, Text, theme } from "galio-framework";
import Images from "../../constants/ArgonImages";
import { StyleSheet, Dimensions, Image } from "react-native";

const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

const thumbMeasure = (WIDHT - 48 - 32) / 3;

const ImageGrid = ({}) => {
  return (
    <Block row space="between" style={{ flexWrap: "wrap" }}>
      {Images.Viewed.map((img, imgIndex) => (
        <Image
          source={{ uri: img }}
          key={`viewed-${img}`}
          resizeMode="cover"
          style={styles.thumb}
        />
      ))}
    </Block>
  );
};

const styles = StyleSheet.create({
  thumb: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
});

export default ImageGrid;
