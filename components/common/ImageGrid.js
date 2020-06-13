import React from "react";
import { Block, Text, theme } from "galio-framework";
import Images from "../../constants/ArgonImages";
import { StyleSheet, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const { width: WIDHT, height: HEIGHT } = Dimensions.get("screen");

const thumbMeasure = (WIDHT - 48 - 32) / 3;
const LOAD_IMG_NUM = 3;

const ImageGrid = ({ posts }) => {
  const navigation = useNavigation();
  const maxLength = posts.length;
  const getSlicedPosts = (posts, index) => {
    const _start = index + 1 - LOAD_IMG_NUM <= 0 ? 0 : index - LOAD_IMG_NUM;
    const _end = index + LOAD_IMG_NUM;
    return posts.slice(_start, _end + 1);
  };
  return (
    <Block row style={{ flexWrap: "wrap" }}>
      {posts.map((post, imgIndex) => {
        const slicedPosts = getSlicedPosts(posts, imgIndex);
        return (
          <TouchableOpacity
            key={`viewed-${imgIndex}`}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("PostList", {
                posts: slicedPosts,
                totalLength: slicedPosts.length,
                maxLength: maxLength,
                currerntIdx: imgIndex,
                LOAD_IMG_NUM: LOAD_IMG_NUM,
              });
            }}
          >
            <Image
              source={{ uri: post.images[0].uri }}
              resizeMode="cover"
              style={styles.thumb}
            />
          </TouchableOpacity>
        );
      })}
    </Block>
  );
};

const styles = StyleSheet.create({
  thumb: {
    borderRadius: 4,
    width: thumbMeasure,
    height: thumbMeasure,
    margin: 2,
  },
});

export default ImageGrid;
