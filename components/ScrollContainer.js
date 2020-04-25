import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "./Loader";
import { BG_COLOR, RED_COLOR } from "../constants/Color";

const ScrollContainer = ({
  loading,
  children,
  contentContainerStyle,
  refreshFn,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFn();
    setRefreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          enabled={true}
          tintColor={RED_COLOR}
          colors={["#ff0000", "#00ff00", "#0000ff"]}
        ></RefreshControl>
      }
      style={{ backgroundColor: BG_COLOR }}
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
