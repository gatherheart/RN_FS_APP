import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "./Loader";
import { BG_COLOR, RED_COLOR, GREEN_COLOR } from "../constants/Color";

const ScrollContainer = ({
  loading,
  children,
  contentContainerStyle,
  refreshFn,
  onScroll,
  scrollEventThrottle,
  HEADER_MAX_HEIGHT,
  style,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFn();
    setRefreshing(false);
  };
  return (
    <ScrollView
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
          // Android offset for RefreshControl
          progressViewOffset={HEADER_MAX_HEIGHT}
        ></RefreshControl>
      }
      style={{ backgroundColor: BG_COLOR, ...style }}
      contentContainerStyle={{
        flex: loading ? 1 : 0,
        alignItems: "center",
        ...contentContainerStyle,
      }}
    >
      {loading ? <Loader></Loader> : children}
    </ScrollView>
  );
};

ScrollContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.object,
  refreshFn: PropTypes.func,
};

export default ScrollContainer;
