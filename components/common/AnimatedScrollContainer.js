import React, { useState } from "react";
import PropTypes from "prop-types";
import { Animated, RefreshControl } from "react-native";
import Loader from "./Loader";
import { BG_COLOR, RED_COLOR, GREEN_COLOR } from "../../constants/Color";
import { HeaderHeight } from "../../utils/HeaderHeight";

const ScrollContainer = ({
  loading,
  children,
  contentContainerStyle,
  refreshFn,
  onScroll,
  scrollEventThrottle,
  HEADER_MAX_HEIGHT,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFn();
    setRefreshing(false);
  };
  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          enabled={true}
          tintColor={GREEN_COLOR}
          colors={["#ff0000", "#00ff00", "#0000ff"]}
          progressViewOffset={HEADER_MAX_HEIGHT}
        ></RefreshControl>
      }
      style={{ backgroundColor: BG_COLOR, paddingTop: HeaderHeight }}
      contentContainerStyle={{
        flex: loading ? 1 : 0,
        alignItems: "center",
        ...contentContainerStyle,
      }}
      contentInset={{
        top: HEADER_MAX_HEIGHT,
      }}
      contentOffset={{
        y: -HEADER_MAX_HEIGHT,
      }}
    >
      {loading ? <Loader></Loader> : children}
    </Animated.ScrollView>
  );
};

ScrollContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.object,
  refreshFn: PropTypes.func,
};

export default ScrollContainer;
