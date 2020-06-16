import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Loader from "../../components/common/Loader";
import { useRoute } from "@react-navigation/native";
import PostComponent from "../../components/common/Post";
import CustomHeader from "../../components/common/CustomHeader";
import { HeaderHeight, UnderHeader } from "../../utils/HeaderHeight";
import styled, { ThemeContext } from "styled-components";
import { POST_HEIGHT } from "../../constants/Size";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const EmptySpace = styled.View`
  height: ${HEIGHT - POST_HEIGHT - UnderHeader}px;
`;
const LOAD_THRESHOLD = 45;

export default ({
  posts,
  scrollDistance,
  getMoreData,
  maxLength,
  totalLength,
  LOAD_IMG_NUM,
}) => {
  const [loading, setLoading] = useState(false);
  const themeContext = useContext(ThemeContext);
  const scrollRef = useRef();
  let SCROLL_HEIGHT = (totalLength - 1) * POST_HEIGHT;
  const scrollReachedEnd = async () => {
    if (loading) return;
    setLoading(true);
    await getMoreData().then(() => {
      setLoading(false);
    });
  };
  const scrollReachedTop = async () => {
    if (loading) return;
    setLoading(true);
    await getMoreData().then(() => {
      setLoading(false);
    });
  };
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
        onScroll={(event) => {
          const current_scroll = event.nativeEvent.contentOffset.y;
          if (current_scroll < -LOAD_THRESHOLD) {
            scrollReachedTop();
            return;
          }
          const _diff = current_scroll - SCROLL_HEIGHT;
          if (_diff >= LOAD_THRESHOLD) scrollReachedEnd();
        }}
        scrollEventThrottle={16}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            style={{ marginBottom: 10 }}
          ></ActivityIndicator>
        ) : null}
        {posts?.length != 0
          ? posts.map((post, index) => {
              return (
                <PostComponent key={`post-${index}`} {...post}></PostComponent>
              );
            })
          : null}
        <EmptySpace>
          {loading ? (
            <ActivityIndicator
              size="small"
              style={{ marginTop: 10 }}
            ></ActivityIndicator>
          ) : null}
        </EmptySpace>
      </ScrollView>
    </>
  );
};
