import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Text,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CustomHeader from "../../../components/common/CustomHeader";
import {
  UnderHeader,
  HeaderHeight,
  StatusHeight,
} from "../../../utils/HeaderHeight";
import { GREEN_COLOR, BLACK_COLOR, GREY_COLOR } from "../../../constants/Color";
const test = [...Array(20).keys()];
console.log(test);
const FirstRoute = () => (
  <ScrollView style={[styles.scene, { backgroundColor: "#ff4081" }]}>
    {test.map((val, idx) => {
      console.log(idx);
      return (
        <Text key={`test-${idx}`} style={{ height: 100 }}>
          {idx}
        </Text>
      );
    })}
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView style={[styles.scene, { backgroundColor: "#673ab7" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };

export default () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "가입 신청" },
    { key: "second", title: "심사 명단" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: GREY_COLOR }}
      style={{ backgroundColor: GREEN_COLOR }}
      activeColor={BLACK_COLOR}
      inactiveColor={GREY_COLOR}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <>
      <CustomHeader></CustomHeader>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{ top: HeaderHeight }}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});
