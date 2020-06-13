import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Loader from "../../components/common/Loader";
import { useRoute } from "@react-navigation/native";
import PostComponent from "../../components/common/Post";
import CustomHeader from "../../components/common/CustomHeader";
import { HeaderHeight } from "../../utils/HeaderHeight";
import styled, { ThemeContext } from "styled-components";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const EmptySpace = styled.View`
  height: ${(HEIGHT * 10) / 100}px;
`;
export default ({ posts, scrollDistance }) => {
  const themeContext = useContext(ThemeContext);
  const scrollRef = useRef();
  useEffect(() => {
    setTimeout(
      () =>
        scrollRef.current.scrollTo({
          y: scrollDistance,
          x: 0,
          animated: false,
        }),
      0
    );
  }, []);
  return (
    <>
      <CustomHeader></CustomHeader>
      <ScrollView
        style={{
          backgroundColor: themeContext.backgroundColor,
          marginTop: HeaderHeight,
        }}
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        {posts?.length != 0
          ? posts.map((post) => {
              return <PostComponent {...post}></PostComponent>;
            })
          : null}
        <EmptySpace></EmptySpace>
      </ScrollView>
    </>
  );
};
